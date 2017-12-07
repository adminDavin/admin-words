import React from "react";
import ReactTooltip from "react-tooltip";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import request from "../sevice/request.js";
import PropTypes from "prop-types";
import TableExport from "tableexport/dist/js/tableexport";
import utils from "../utils.js";

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

class ViewWordsTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uuId: props.uuId,
      data: [],
      initPage: props.initPage,
      docId: props.docId
    };
  }

  componentWillUpdate(item, item1) {
    if (item.uuId != item1.uuId) {
      item1.uuId = item.uuId;
      this.setState({ data: [] });
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
          let text = utils.addWordsPre(container.getSelection().toString());
          if (text != null) {
            let params = new FormData();
            params.append("docId", me.props.docId);
            params.append("initPage", me.props.initPage);
            params.append("pageNum", text.pageInfo);
            params.append("textContent", text.words);
            params.append("userId", me.props.userId);
            console.log(params);
            request.sendRequst("/admin/addWords", params, function(resp) {
              let data = me.state.data;
              text.pageInfo = text.pageInfo + me.props.initPage;
              data.push(text);
              me.setState({ data: data });
            });
            container.getSelection().removeAllRanges();
          }
        }
      };
    }
  }

  componentDidMount() {
    TableExport(document.getElementById("words-table"), {
      headers: false, // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
      footers: true, // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
      formats: ["xls", "txt"], // (String[]), filetype(s) for the export, (default: ['xls', 'csv', 'txt'])
      filename: "id", // (id, String), filename for the downloaded file, (default: 'id')
      bootstrap: true, // (Boolean), style buttons using bootstrap, (default: true)
      exportButtons: true, // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
      position: "top", // (top, bottom), position of the caption element relative to table, (default: 'bottom')
      ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
      ignoreCols: null // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
      // trimWhitespace: true // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
    });
    document.oncontextmenu = function() {
      return false;
    };
  }

  onDoubleClick(item, event) {
    let data = this.state.data;
    this.setState({ data: utils.removeElement(data, item) });
    return false;
  }

  render() {
    let data = this.state.data;
    return (
      <div className="container-fluid">
        <div className="row ">
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
  initPage: PropTypes.number,
  docId: PropTypes.number,
  userId: PropTypes.number
};

export default ViewWordsTable;
