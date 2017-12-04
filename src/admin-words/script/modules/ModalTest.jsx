import React from "react"; 
import ModalCommon from "./ModalCommon.jsx";
import "bootstrap/dist/js/bootstrap.js";
import PropTypes from 'prop-types';
export default class ModalTest extends React.Component { 
  constructor(props) {
    super(props);

    this.state = { isOpen: true };
  }
  toggleModal = (flag,child) => { 
    this.setState({
      isOpen: !this.state.isOpen
    });
    if(flag){
      console.log("modal test  click true");
    } 
  }
  
  render() { 
    return (
      <div className="container">
        <div className="alert alert-primary">
          This is a primary alert—check it out!
        </div>  
 
        <ModalCommon onClose={this.toggleModal} pe={"#content"} show={this.state.isOpen}>
        <div>sdasffs</div> 
        
        
        </ModalCommon>
      </div>
    );
  }
}
