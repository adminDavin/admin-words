import React from "react";
import Modal from "react-modal";
import Iframe from "react-iframe";
import "bootstrap/dist/js/bootstrap.js";
import ModalCommon from "./ModalCommon.jsx";
import ViewWordsTable from "./ViewWordsTable.jsx";
import utils from "../utils.js";
import request from "../sevice/request.js";
import InputNumber from "react-input-number";

import ReactTooltip from "react-tooltip";

class TrContent extends React.Component {
  render() {
    let state = "异常";
    let item = this.props.data;
    if (item.state == 0) {
      state = "正常";
    }
    return (
      <tr>
        <td>
          <input
            type="radio"
            name="exampleRadios"
            onClick={this.props.choseDocu.bind(
              this,
              item.uuid,
              item.name,
              item.docId,
              item.state
            )}
          />
        </td>
        <td>
          <span className="dv-td-text-longer" data-tip={item.uuid}>
            {item.uuid}
          </span>
          <ReactTooltip data-place="right" />
        </td>
        <td>
          <span className="dv-td-text-longer" data-tip={item.name}>
            {item.name}
          </span>{" "}
        </td>
        <td>
          <span className="dv-td-text-longer" data-tip={item.originalName}>
            {item.originalName}
          </span>{" "}
        </td>
        <td>{state}</td>
        <td>{utils.formatDate(item.modifyDate)}</td>
        <td>{utils.formatDate(item.createDate)}</td>
      </tr>
    );
  }
}

class TbodyContent extends React.Component {
  render() {
    let me = this;
    return (
      <tbody>
        {this.props.data.map(function(pro, index) {
          return (
            <TrContent
              data={pro}
              key={pro.docId}
              index={index}
              choseDocu={me.props.choseDocu}
            />
          );
        })}
      </tbody>
    );
  }
}

export default class ViewTitile extends React.Component {
  constructor() {
    super();
    this.state = {
      pdfUrl: "test",
      pdfName: "测试文档",
      isOpen: false,
      hisData: [],
      docId: 0,
      initPage: 0,
      userId: 1,
      wordsInfo: []
    };
  }

  toggleModal = (flag, child) => {
    let me = this;
    if (flag == "True") {
      if (sessionStorage.hisInfo) {
        let hisInfo = JSON.parse(sessionStorage.hisInfo);
        request.sendRequstNew(
          "/admin/listWords",
          { docId: hisInfo.docId, userId: me.state.userId, state: 0 },
          function(resp) {
            if (resp.code === "200") {
              me.setState({
                pdfUrl: hisInfo.pdfUrl,
                pdfName: hisInfo.pdfName,
                docId: hisInfo.docId,
                wordsInfo: resp.result.data
              });
            } else {
              alert(resp.message);
            }
          }
        );
      } else {
        let files = $("#wordsFileInput").get(0).files;
        if (utils.fileValid(files)) {
          let name = $("#wordsFileNameInput").val();
          let formdata = new FormData();
          formdata.append("file", files[0]);
          formdata.append("name", name);
          formdata.append("userId", me.state.userId);
          request.apiLoadFile(function(result) {
            if (result.code === "200") {
              me.setState({
                pdfUrl: result.result.uuID,
                pdfName: result.result.name,
                docId: parseInt(result.result.docId),
                wordsInfo: []
              });
            } else {
              alert(result.message);
            }
            $("#loading").modal("hide");
          }, formdata);
        }
      }
    }

    sessionStorage.removeItem("hisInfo");
    me.setState({ isOpen: !me.state.isOpen });
  };
  choseDocu(uuID, name, docId, state) {
    if (state === 0) {
      sessionStorage.setItem(
        "hisInfo",
        JSON.stringify({ pdfUrl: uuID, pdfName: name, docId: docId })
      );
    }
  }
  getDocuLog() {
    let me = this;
    request.sendRequstNew(
      "/admin/listDocument",
      { userId: me.state.userId, state: 0 },
      function(resp) {
        if (resp.code === "200") {
          let hisData = resp.result.data;
          me.setState({ hisData: hisData });
        } else {
          alert(resp.result);
        }
      }
    );
  }
  render() {
    let me = this;
    let formContent = (
      <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              {"新建文档"}
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              onClick={this.getDocuLog.bind(this)}
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              {"查看历史"}
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <form>
              <div className="form-group">
                <label>文档名称</label>
                <input
                  type="text"
                  className="form-control"
                  id="wordsFileNameInput"
                  placeholder="文档名称"
                />
              </div>
              <div className="form-group">
                <label>选择文档</label>
                <input
                  type="file"
                  className="form-control"
                  id="wordsFileInput"
                />
              </div>
            </form>
          </div>
          <div
            className="tab-pane fade "
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="dv-table-hist">
              <table
                className="table table-bordered table-hover"
                style={{ minWidth: 800 }}
              >
                <thead className="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>文档ID</th>
                    <th>名称</th>
                    <th>原始文件名</th>
                    <th>状态</th>
                    <th>上次打开时间</th>
                    <th>创建时间</th>
                  </tr>
                </thead>
                <TbodyContent
                  data={this.state.hisData}
                  choseDocu={this.choseDocu}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    );
    let url =
      "pdf-viewer/web/viewer.html?file=/pdf-store/1/" +
      this.state.pdfUrl +
      ".pdf";
    if (this.state.pdfUrl == "test") {
      url = "pdf-viewer/web/viewer.html?file=" + this.state.pdfUrl + ".pdf";
    }
    return (
      <div className="container">
        <div className="row alert alert-primary">
          <div className="col-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.toggleModal}
            >
              {"切换文档"}
            </button>
            <ModalCommon
              onClose={this.toggleModal}
              pe={"#viewTitle"}
              show={this.state.isOpen}
            >
              {formContent}
            </ModalCommon>
          </div>
          <div className="col-4 align-self-center">
            {"文档名称:"}
            {this.state.pdfName}
          </div>
          <div className="col-4 align-self-center">
            {"文档ID:"}
            {this.state.pdfUrl}
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div
            id="words-table"
            className="col-3 alert alert-primary dv-words-table"
          >
            <ViewWordsTable
              uuId={this.state.pdfUrl}
              docId={this.state.docId}
              userId={this.state.userId}
              wordsInfo={this.state.wordsInfo}
              pdfName={this.state.pdfName}
            />
          </div>
          <Iframe
            url={url}
            // url="pdf-viewer/web/viewer.html"
            height="800px"
            width="100%"
            id="myIframe"
            className="col"
            display="initial"
            position="relative"
            allowFullScreen
            on
          />
        </div>
      </div>
    );
  }
}
