import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import TopNavigation from '../compoents/comons/topNavigation';
import SideNavigation from '../compoents/comons/sideNavigation';
import Footer from '../compoents/comons/footer';

class Application extends Component {
  render() {
    return (
      <MDBContainer fluid>
        <TopNavigation></TopNavigation>
        <SideNavigation></SideNavigation>
        hello mdbreact
        <main id="content" className="p-8">
        
        dddd
        </main>
        <Footer></Footer>
      </MDBContainer>
      );
  }
}
export default Application;