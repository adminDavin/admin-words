import React from "react";
import Modal from "react-modal";
import Iframe from "react-iframe";
import axios from 'axios';
import ViewWordsTable from "./ViewWordsTable.jsx";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const fileValid=function(file){
  if (file == "") {  
      alert("请选择要上传的文件");  
      return false  
  } else {  
      //检验文件类型是否正确  
      var exec = (/[.]/.exec(file)) ? /[^.]+$/.exec(file.toLowerCase()) : '';  
      if (exec != "pdf") {  
          alert("文件格式不对，请上传Pdf文件!");  
          return false;  
      }  
  }  
  return true; 
}

export default class ViewTitile extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this); 
    this.closeModal = this.closeModal.bind(this); 
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }
 

  closeModal(flag) {    
    var file = $("#wordsFileInput").val();
    let formdata = new FormData(); 
    formdata.append('file',file);
    formdata.append('action','test');
    if(fileValid(file)){
      axios.post('http://localhost:8080/admin/loadFile',{test:"test"})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      }); 
    }
     // axios.post('admin/loadFile',{});
    if(flag){
      console.log("ddddd");
    }else{
      console.log("fdsfasdf");
    }
    this.setState({ modalIsOpen: false });
  } 

  render() {
    Modal.setAppElement('#viewTitle');
    const modalIns = (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen} 
          className="dv-modal-dialog"
          shouldCloseOnOverlayClick={false}
          contentLabel="Minimal Modal Example" 
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{"选取文档"}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.closeModal.bind(this,false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form  >
                <div className="form-group">
                  <label  >文档名称</label>
                  <input
                    type="text"
                    className="form-control"
                    id="wordsFileNameInput"
                    placeholder="文档名称"
                  />
                </div>
                <div className="form-group">
                  <label  >选择文档</label>
                  <input
                    type="file"
                    className="form-control"
                    id="wordsFileInput"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.closeModal.bind(this,true)}
              >
                {"确定"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.closeModal.bind(this,false)}
              >
                {"取消"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );

    return (
      <div className="container">
        {modalIns}
        <div className="row alert alert-primary">
          <div className="col-2">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.openModal} 
            >
              {"切换文档"}
            </button>
          </div>
          <div className="col-6 align-self-center">{"文档名称:"}</div>
          <div className="col-4 align-self-center">{"文档ID:"}</div>
        </div>
        <div className="row justify-content-md-center">
          <div
            id="words-table"
            className="col-3 alert alert-primary dv-words-table"
          >
            <ViewWordsTable />
          </div>
          <Iframe
            url="pdf-viewer/web/viewer.html"
            height="800px"
            width="100%"
            id="myIframe"
            className="col"
            display="initial"
            position="relative"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
}
