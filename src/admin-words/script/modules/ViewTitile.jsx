import React from "react";
import Modal from "react-modal";
import Iframe from "react-iframe";
import "bootstrap/dist/js/bootstrap.js";
import ModalCommon from "./ModalCommon.jsx";
import ViewWordsTable from "./ViewWordsTable.jsx";
import utils from "../utils.js";
import request from "../sevice/request.js";
import InputNumber from "react-input-number";

class TrContent extends React.Component {
  render() {
    var item = this.props.data;
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.sale}</td>
      </tr>
    );
  }
}

class TbodyContent extends React.Component {
  render() {
    return (
      <tbody>
        {this.props.data.map(function(pro, index) {
          return <TrContent data={pro} key={pro.name} index={index} />;
        })}
      </tbody>
    );
  }
}

export default class ViewTitile extends React.Component {
  constructor() {
    super();
    this.state = {
      pdfUrl: "java-se-product-editions-397069",
      pdfName: "测试文档",
      isOpen: false,
      hisData: [],
      docId: 0,
      initPage: 0
    };
  }

  inputNumOnChange = function(value) {
    this.setState({ initPage: value });
    $("[data-toggle='tooltip']").tooltip("hide");
  };
  toggleModal = (flag, child) => {
    let me = this;
    if (flag == "True") {
      let files = $("#wordsFileInput").get(0).files;
      if (utils.fileValid(files)) {
        let name = $("#wordsFileNameInput").val();
        let formdata = new FormData();
        formdata.append("file", files[0]);
        formdata.append("name", name);
        request.apiLoadFile(function(result) {
          me.setState({
            pdfUrl: result.uuID,
            pdfName: result.name,
            docId: result.docId,
            initPage: 0
          });
          $("[data-toggle='tooltip']").tooltip("show");
        }, formdata);
      }
    }
    me.setState({ isOpen: !me.state.isOpen });
  };

  getDocuLog(me) {
    let hisData = [
      {
        name: "电锅",
        price: 100,
        sale: 1000
      }
    ];
    me.setState({ hisData: hisData });
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
              onClick={this.getDocuLog.bind(this, me)}
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
              {"开发尚未完成"}
              {/* <table className="table table-bordered ">  
            <thead>  
            <tr>  
                <th>文档ID</th>  
                <th>名称</th>  
                <th>状态</th>  
                <th>上次打开时间</th>  
                <th>创建时间</th>  
                </tr>  
            </thead>  
            <TbodyContent data={this.state.hisData} />  
          </table>   */}
            </div>
          </div>
        </div>
      </div>
    );

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
          <div className="col-2 align-self-center input-group">
            <span
              className="input-group-addon"
              data-toggle="tooltip"
              data-placement="bottom"
              title="请使用使用上翻键使初始页码调整至自己所需的初始页码。如果不这样操作，不可进行选词操作！"
            >
              {"初始页码"}{" "}
            </span>
            <InputNumber
              className="input"
              min={0}
              step={1}
              value={this.state.initPage}
              style={{ width: 70 }}
              onChange={value => this.inputNumOnChange(value)}
            />
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div
            id="words-table"
            className="col-3 alert alert-primary dv-words-table"
          >
            <ViewWordsTable
              uuId={this.state.pdfUrl}
              initPage={this.state.initPage}
              docId={this.state.docId}
              userId={this.state.userId}
            />
          </div>
          <Iframe
            url={
              "pdf-viewer/web/viewer.html?file=/pdf-store/" +
              this.state.pdfUrl +
              ".pdf"
            }
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
