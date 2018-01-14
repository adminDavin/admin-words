import React from "react";
export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div
        className="modal fade"
        id={this.props.modalEleId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="forgetPassModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog dv-modal" role="document">
          <div className="modal-content" style={{ width: this.props.width }}>
            <div className="modal-header">
              <h5 className="modal-title">{this.props.modalTitle}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.modalColseAction.bind(
                  this,
                  this.props.mine
                )}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" id="modalForm" style={{ marginTop: 0 }}>
              {this.props.children}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.props.modalAction.bind(this, this.props.mine)}
              >
                {"确定"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.props.modalColseAction.bind(
                  this,
                  this.props.mine
                )}
              >
                {"取消"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
