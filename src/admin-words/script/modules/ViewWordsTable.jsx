import React from "react";
import ReactTooltip from "react-tooltip";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import "bootstrap/dist/js/bootstrap.js";
import request from "../sevice/request.js";
import PropTypes from "prop-types";
import utils from "../utils.js";
import ModalCommonv1 from "./ModalCommonv1.jsx";
const regNumber = new RegExp("^[0-9]*$");

const trContent = function(me, item, key) {
  let pageInfo = item.initPage + item.pageNum;
  return (
    <tr key={"words_" + key} onContextMenu={me.onDoubleClick.bind(me, item)}>
      <td>{key + 1}</td>
      <td>
        <span className="dv-td-text-longer" data-tip={item.textContent}>
          {item.textContent}
        </span>
        <ReactTooltip />
      </td>
      <td>{pageInfo}</td>
    </tr>
  );
};

class ViewWordsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuId: props.uuId,
      data: [],
      initPage: 0,
      docId: props.docId,
      showModal: false,
      modalData: null
    };
  }

  componentWillUpdate(item, item1) {
    let me = this;
    if (item.uuId != item1.uuId) {
      setTimeout(function() {
        me.setState({
          data: me.props.wordsInfo,
          uuId: item.uuId,
          docId: me.props.docId
        });
      }, 500);
      $("#InitPageInputTarget")[0].value = 0;
      $('[data-toggle="tooltip"]').tooltip("show");
    }
  }

  exportTolocal() {
    let me = this;
    request.sendRequstExportWords(
      "/admin/exportWords",
      {
        docId: me.props.docId,
        userId: me.props.userId,
        fileName: me.props.pdfName,
        type: "doc"
      },
      function(resp) {
        if (resp.code !== "200") {
          alert(resp.result);
        }
      }
    );
  }

  changeInitPage() {
    let oldValue = this.state.initPage;
    $('[data-toggle="tooltip"]').tooltip("hide");
    let value = $("#InitPageInputTarget").val();
    if (!regNumber.test(value)) {
      alert("请输入数字!");
      return;
    }
    // if (value == "") {
    //   alert("初始页码不能为空!");
    //   return;
    // }
    let newValue = parseInt(value);
    if (oldValue != newValue) {
      this.setState({
        initPage: newValue
      });
    }
  }

  componentDidUpdate() {
    let me = this;
    let myframe = document.getElementById("myIframe");
    // 选词录入功能
    if (myframe) {
      myframe.contentWindow.onmouseup = function() {
        let container = myframe.contentWindow;
        if (container.getSelection) {
          let wordsInfo = utils.addWordsPre(container);
          if (wordsInfo != null) {
            let initPage = parseInt($("#InitPageInputTarget").val());
            let params = {
              docId: me.props.docId,
              initPage: initPage,
              pageNum: wordsInfo.pageNum,
              textContent: wordsInfo.textContent,
              userId: me.props.userId
            };
            request.sendRequstNew("/admin/addWords", params, function(resp) {
              if (resp.code === "200") {
                let data = me.state.data;
                wordsInfo["wordsId"] = resp.result.data.wordsId;
                wordsInfo["initPage"] = initPage;
                data.push(wordsInfo);
                me.setState({ data: data });
              } else {
                alert(resp.result);
              }
            });
          }
        }
      };
    }
  }

  onDoubleClick(item, event) {
    this.setState({ showModal: true, modalData: item });
  }
  componentDidMount() {
    document.oncontextmenu = new Function("event.returnValue=false;");
  }
  modalAction(flag, child) {
    let me = this;
    let item = this.state.modalData;
    if (flag == "True") {
      request.sendRequstNew(
        "/admin/deleteWords",
        { wordsId: item.wordsId, userId: me.props.userId },
        function(resp) {
          if (resp.code === "200") {
            let data = me.state.data;
            me.setState({ data: utils.removeElement(data, item) });
          } else {
            alert(resp.result);
          }
        }
      );
    }
    this.setState({ showModal: false });
  }

  render() {
    let data = this.state.data;
    let tableTools = (
      <div className="row dv-words-table-title">
        <div className="col-4">
          <button
            type="button"
            className="btn btn-outline-info btn-sm"
            onClick={this.exportTolocal.bind(this)}
          >
            保存至本地
          </button>
        </div>
        <div className="col-8">
          <div className="input-group  input-group-sm">
            <div className="input-group-addon">初始页码</div>
            <input
              type="number"
              className="form-control tooltip-show"
              style={{ zIndex: "auto" }}
              id="InitPageInputTarget"
              min="0"
              value={this.state.initPage}
              // placeholder={this.state.initPage}
              onChange={this.changeInitPage.bind(this)}
              data-toggle="tooltip"
              title="请设置初始页码"
            />
          </div>
        </div>
      </div>
    );

    let modal = (
      <ModalCommonv1
        modalData={this.state.modalData}
        onClose={this.modalAction.bind(this)}
        show={this.state.showModal}
        pe={"#viewTitle"}
        title="请确认"
      >
        <p>确定是否删除？</p>
      </ModalCommonv1>
    );

    return (
      <div className="container-fluid">
        {tableTools}
        {modal}
        <div className="row dv-table-scoll-wrap">
          <table className="table thead-light table-bordered" id="words-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col" width="40px;">
                  #
                </th>
                <th scope="col">检索词</th>
                <th scope="col" width="80px;">
                  录入页码
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, key) => {
                return trContent(this, item, key);
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ViewWordsTable.propTypes = {
  uuId: PropTypes.string,
  docId: PropTypes.number,
  pdfName: PropTypes.string,
  userId: PropTypes.number,
  wordsInfo: PropTypes.any
};

export default ViewWordsTable;
