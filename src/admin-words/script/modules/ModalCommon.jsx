import React from "react"; 
import Modal from "react-modal";
import PropTypes from 'prop-types';
import "bootstrap/dist/js/bootstrap.js";

class ModalCommon extends React.Component {
  componentDidMount(){ 
    $("#exampleModal").modal('show')
  }
  render() {
    Modal.setAppElement(this.props.pe); 
    if(!this.props.show) {
        return null;
    }
    return ( 
        <Modal
          isOpen={this.props.show}
          className="dv-modal-dialog"
          shouldCloseOnOverlayClick={false} 
        >
          <div className="modal-content">
            <div className="modal-header alert alert-success">
              <strong>{"选取文档"} </strong>  
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.onClose.bind(this,"True")}
                >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                 {this.props.children} 
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={this.props.onClose.bind(this,"True")}
                >
                {"确定"}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-dismiss="modal"
                onClick={this.props.onClose.bind(this,"")}
              >
                {"取消"}
              </button>
            </div>
          </div>
        </Modal> 
    );
  }
}

ModalCommon.propTypes = {
    onClose: PropTypes.func.isRequired, 
    children: PropTypes.node,
    show:PropTypes.bool,
    pe: PropTypes.string
};
  
export default ModalCommon;