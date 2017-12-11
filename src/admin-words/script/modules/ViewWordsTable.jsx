import React from "react";
import ReactTooltip from "react-tooltip";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import request from "../sevice/request.js";
import PropTypes from "prop-types";
import utils from "../utils.js";
import ModalCommonv1 from "./ModalCommonv1.jsx";

const trContent = function(me, item, key) {
  return (
    <tr key={"words_" + key} onContextMenu={me.onDoubleClick.bind(me, item)}>
      <td>{key + 1}</td>
      <td>
        <span className="dv-td-text-longer" data-tip={item.words}>
          {item.words}
        </span>
        <ReactTooltip />
      </td>
      <td>{item.pageInfo}</td>
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
      showModal: true,
      modalData: null
    };
  }

  componentWillUpdate(item, item1) {
    if (item.uuId != item1.uuId) {
      item1.uuId = item.uuId;
      item1.initPage = 0;
      $("#InitPageInputTarget")[0].value = this.state.initPage;
    }
  }

  exportTolocal() {
    console.log(this);
  }

  changeInitPage() {
    let oldValue = this.state.initPage;
    let newValue = parseInt($("#InitPageInputTarget").val());
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
            let params = new FormData();
            let initPage = parseInt($("#InitPageInputTarget").val());
            params.append("docId", me.props.docId);
            params.append("initPage", initPage);
            params.append("pageNum", wordsInfo.pageInfo);
            params.append("textContent", wordsInfo.words);
            params.append("userId", me.props.userId);
            request.sendRequst("/admin/addWords", params, function(resp) {
              let data = me.state.data;
              wordsInfo.pageInfo = wordsInfo.pageInfo + initPage;
              wordsInfo["wordsId"] = 1;
              data.push(wordsInfo);
              me.setState({ data: data });
            });
          }
        }
      };
    }
  }

  onDoubleClick(item, event) {
    this.setState({ showModal: true, modalData: item });
  }

  modalAction(flag, child) {
    let me = this;
    let item = this.state.modalData;
    if (flag == "True") {
      request.sendRequst(
        "/admin/deleteWords",
        { wordsId: item.wordsId },
        function(resp) {
          if (resp.code === 200) {
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
              className="form-control"
              style={{ zIndex: "auto" }}
              id="InitPageInputTarget"
              min="0"
              placeholder={this.state.initPage}
              onChange={this.changeInitPage.bind(this)}
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
        <div className="row" id="scroll_wrap">
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
  userId: PropTypes.number
};

export default ViewWordsTable;