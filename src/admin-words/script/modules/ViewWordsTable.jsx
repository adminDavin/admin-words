import React from "react";
import ReactTooltip from "react-tooltip";
const charFilter = function(str) {
  str = str.replace(/[\n]/gi, "");
  str = str.replace(/\"/g, "");
  return str;
};

const trContent = function(me, item, key) {
  console.log(me);
  return (
    <tr key={"words_" + key} onDoubleClick={me.onDoubleClick}>
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
  state = {
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

  componentDidMount() {
    let me = this;
    let myIframe = document.getElementById("myIframe").contentWindow;

    let myDocument = myIframe.document;
    let container = container || myIframe;
    // 选词录入功能
    container.onmouseup = function() {
      var text = "";
      if (container.getSelection) {
        text = container.getSelection().toString();
      } else if (
        myDocument.selection &&
        myDocument.selection.type != "Control"
      ) {
        text = myDocument.selection.createRange().text;
      }
      if ("" != text) {
        if (text.length > 100) {
          alert("选取的词超过了100个字符，请重新选取！");
          container.getSelection().removeAllRanges();
          return;
        } else {
          let content = $("#myIframe").contents();
          let page = content.find("#pageNumber").val();
          let item = { id: 1, words: charFilter(text), pageInfo: page };
          let data = me.state.data;
          data.push(item);
          me.setState({ data: data });
        }
      }
    };
  }
  onDoubleClick() {
    console.log("dddddddddddd");
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
export default ViewWordsTable;
