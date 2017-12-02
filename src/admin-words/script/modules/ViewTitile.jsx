import React from "react";
import Modal from "react-modal";
import Iframe from "react-iframe";
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
export default class ViewTitile extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = "#f00";
  }

  closeModal(event, flag) {
    console.log(event, flag);
    this.setState({ modalIsOpen: false });
  }
  checkFile() {
    console.log(this);
    console.log(this.refs.modelinstance);
  }

  render() {
    const modalIns = (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
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
                onClick={this.closeModal.bind(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="formGroupExampleInput">文档名称</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="文档名称"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlFile1">选择文档</label>
                  <input
                    type="file"
                    className="form-control"
                    id="exampleFormControlFile1"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.closeModal.bind(true)}
              >
                {"确定"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.closeModal.bind(false)}
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
              // onClick={this.checkFile.bind(this)}
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
