import React, { Component } from 'react';
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBIcon, NavLink } from 'mdbreact';
import logo from '../../assets/mdb-react.png'

class TopNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false
        };
    }
    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <MDBContainer>
                <a href="#!" className="logo-wrapper waves-effect">
                    <img alt="MDB React Logo" className="img-fluid" src={logo} />
                </a>
                <MDBListGroup>
                    <NavLink exact={true} to="/" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="chart-pie" className="mr-3" />
                            Dashboard
                    </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/profile" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="user" className="mr-3" />
                            Profile
                    </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/tables" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="table" className="mr-3" />
                            Tables
                    </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/maps" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="map" className="mr-3" />
                            Maps
                    </MDBListGroupItem>
                    </NavLink>
                    <NavLink to="/404" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="exclamation" className="mr-3" />
                            404
                    </MDBListGroupItem>
                    </NavLink>
                </MDBListGroup>
            </MDBContainer>
        );
    }
}

export default TopNavigation;
