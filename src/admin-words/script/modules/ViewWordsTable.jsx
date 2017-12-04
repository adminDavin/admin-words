import React from "react";
import ReactTooltip from "react-tooltip";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import InputNumber from "rc-input-number";
import "rc-input-number/assets/index.css";
import TableExport from "tableexport/dist/js/tableexport";
// console.log(Tableexport);
const charFilter = function(str) {
  str = str.replace(/[\n]/gi, "");
  str = str.replace(/\"/g, "");
  return str;
};
const removeElement = function(arr, ele) {
  var result = [];
  if (arr instanceof Array) {
    if (ele instanceof Array) {
      result = arr.filter(function(item) {
        var isInEle = ele.some(function(eleItem) {
          return item === eleItem;
        });
        return !isInEle;
      });
    } else {
      result = arr.filter(function(item) {
        return item !== ele;
      });
    }
  } else {
    console.log("parameter error of function removeElement");
  }
  return result;
};

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
      disabled: false,
      readOnly: false,
      value: 1,
      modalIsOpen: true,
      data: [
        { id: 1, words: "this is test!", pageInfo: 5 },
        {
          id: 2,
          words: "this is dddddddddddddddddddddddddddddddddddddddddddddddddd !",
          pageInfo: 5
        },
        { id: 3, words: "this is testdsdffffffffffff!", pageInfo: 5 },
        { id: 4, words: "this is test!", pageInfo: 5 }
      ]
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      uuId: nextProps.uuId,
      data: []
    });
    let me = this;
  }

  // componentDidUpdate() {
  //   let me = this;
  //   // 选词录入功能

  //   console.log("sdsdasddssssssssssssssssssssssssssss");
  //   document.getElementById("myIframe").contentWindow.onmouseup = function() {
  //     // $("#myIframe").conte/nts().mouseup = function() {
  //     console.log("sfsdfddfdddddddddddddddddd");

  //     let myDocument = document.getElementById("myIframe").document;
  //     var text = "";
  //     let container = document.getElementById("myIframe").contentWindow;
  //     if (container.getSelection) {
  //       text = container.getSelection().toString();
  //     } else if (
  //       myDocument.selection &&
  //       myDocument.selection.type != "Control"
  //     ) {
  //       text = myDocument.selection.createRange().text;
  //     }
  //     text = charFilter(text);
  //     if ("" != text) {
  //       if (text.length > 100) {
  //         alert("选取的词超过了100个字符，请重新选取！");
  //         container.getSelection().removeAllRanges();
  //         return;
  //       } else {
  //         let content = $("#myIframe").contents();
  //         let page = content.find("#pageNumber").val();
  //         let item = {
  //           id: 1,
  //           words: text,
  //           pageInfo: parseInt(page) + me.state.value - 1
  //         };
  //         let data = me.state.data;
  //         data.push(item);
  //         me.setState({ data: data });
  //       }
  //     }
  //   };
  // }
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
    // window.addEventListener("message", event => {
    //   console.log("previewPage receives message", event, false);
    // });
    let me = this;
    // 选词录入功能

    document.getElementById("myIframe").contentWindow.onmouseup = function() {
      // $("#myIframe").conte/nts().mouseup = function() {
      console.log("sfsdfddfdddddddddddddddddd");
      let myDocument = document.getElementById("myIframe").document;
      var text = "";
      let container = document.getElementById("myIframe").contentWindow;
      if (container.getSelection) {
        text = container.getSelection().toString();
      } else if (
        myDocument.selection &&
        myDocument.selection.type != "Control"
      ) {
        text = myDocument.selection.createRange().text;
      }
      text = charFilter(text);
      if ("" != text) {
        if (text.length > 100) {
          alert("选取的词超过了100个字符，请重新选取！");
          container.getSelection().removeAllRanges();
          return;
        } else {
          let content = $("#myIframe").contents();
          let page = content.find("#pageNumber").val();
          let item = {
            id: 1,
            words: text,
            pageInfo: parseInt(page) + me.state.value - 1
          };
          let data = me.state.data;
          data.push(item);
          me.setState({ data: data });
        }
      }
    };
  }

  onDoubleClick(item, event) {
    let data = this.state.data;
    this.setState({ data: removeElement(data, item) });
    return false;
  }

  onChange = value => {
    console.log("onChange:", value);
    this.setState({ value });
  };
  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal(flag) {
    // axios.post('admin/loadFile',{});
    if (flag) {
      // console.log($("#words-table").tableExport({ type: "excel" }));
      console.log("ddddd");
    } else {
      console.log("fdsfasdf");
    }
    this.setState({ modalIsOpen: false });
  }
  render() {
    let data = this.state.data;

    return (
      <div className="container-fluid">
        <div className="container dv-words-table-up">
          <div style={{ marginBottom: 5 }}>
            <span className="badge badge-light">起始页码</span>
            <InputNumber
              min={1}
              value={this.state.value}
              style={{ width: 50 }}
              readOnly={this.state.readOnly}
              onChange={this.onChange}
              disabled={this.state.disabled}
              useTouch
            />
          </div>
        </div>
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
export default ViewWordsTable;
