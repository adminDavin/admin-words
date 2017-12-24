import React from "react";
import ReactTooltip from "react-tooltip";
import request from "../../sevice/request.js";
import utils from "../../utils.js";

export default class WordsDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentWillReceiveProps(docInfo) {
    let me = this;
    let doc = docInfo.docInfo;

    if (typeof doc.name === "undefined") {
      return false;
    }
    request.sendRequstNew(
      "/admin/listWords",
      { userId: doc.userId, docId: doc.docId },
      function(result) {
        if (result.code != "200") {
          alert(result.result);
        } else {
          let data = result.result.data;

          console.log(data);
          me.setState({ data: data });
        }
      }
    );
  }

  deleteDocBydoc(words, e) {
    let me = this;
    request.sendRequstNew(
      "/admin/deleteWords",
      { wordsId: words.wordsId, userId: words.userId },
      function(resp) {
        if (resp.code === "200") {
          let data = me.state.data;
          me.setState({ data: utils.removeElement(data, words) });
        } else {
          alert(resp.result);
        }
      }
    );
  }

  exportTolocal() {
    let me = this;

    let doc = me.props.docInfo;
    request.sendRequstExportWords(
      "/admin/exportWords",
      {
        docId: doc.docId,
        userId: doc.userId,
        fileName: doc.name,
        type: "doc"
      },
      function(resp) {
        if (resp.code !== "200") {
          alert(resp.result);
        }
      }
    );
  }
  render() {
    let doc = this.props.docInfo;
    let th = (
      <thead className="thead-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">操作</th>
          <th scope="col" className="textContent">
            关键字
          </th>
          <th scope="col" className="initPage">
            初始页码
          </th>
          <th scope="col" className="pageNum">
            录入页码
          </th>
          <th scope="col" className="createTime">
            创建时间
          </th>
        </tr>
      </thead>
    );
    let td = (
      <tbody>
        {this.state.data.map((pro, index) => {
          return (
            <tr key={pro.wordsId}>
              <td>{index}</td>
              <td>
                <div
                  className="btn-group-sm"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    className="btn btn-secondary dv-mr10"
                    onClick={this.deleteDocBydoc.bind(this, pro)}
                  >
                    删除
                  </button>
                </div>
              </td>
              <td>
                <span className="dv-td-text-longer" data-tip={pro.textContent}>
                  {pro.textContent}
                </span>
                <ReactTooltip />
              </td>
              <td>{pro.initPage}</td>
              <td>{pro.pageNum}</td>
              <td>{utils.formatDate(pro.createTime)}</td>
            </tr>
          );
        })}
      </tbody>
    );

    return (
      <div className="container">
        <div className="row">
          <dl className="col-2 dl-horizontal">
            <dt>文档名称</dt>
            <dd>
              <span className="dv-td-text-longer" data-tip={doc.name}>
                {doc.name}
              </span>
              <ReactTooltip />
            </dd>
          </dl>
          <dl className="col-2 dl-horizontal">
            <dt>原始文件名</dt>
            <dd>
              <span className="dv-td-text-longer" data-tip={doc.originalName}>
                {doc.originalName}
              </span>
              <ReactTooltip />
            </dd>
          </dl>
          <dl className="col-4 dl-horizontal">
            <dt>文档Id</dt>
            <dd>{doc.uuid}</dd>
          </dl>
          <dl className="col-2 dl-horizontal">
            <dt>状态</dt>
            <dd>{doc.state}</dd>
          </dl>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-primary dv-mt20"
              onClick={this.exportTolocal.bind(this)}
            >
              保存至本地
            </button>
          </div>
        </div>
        <table className="table">
          {th}
          {td}
        </table>
      </div>
    );
  }
}
