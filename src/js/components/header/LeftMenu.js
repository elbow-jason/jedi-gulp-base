import React, { Component } from 'react';
import { Link }             from 'react-router';
import { Nav }              from 'react-bootstrap';
import { NavItem }          from 'react-bootstrap';
import { NavDropdown }      from 'react-bootstrap';
import { MenuItem }         from 'react-bootstrap';
import { connect }          from 'react-redux';
import * as actions         from '../../actions';

class LeftMenu extends Component {
  authenticatedMenu(){
    return (
      <Nav>
        <NavItem eventKey={1} href="#dashboard">Dashboard</NavItem>
        <NavItem eventKey={2} href="#contacts">Contacts</NavItem>
        <NavDropdown eventKey={3} title="Media" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} href="#photos">
              Photos
          </MenuItem>
          <MenuItem eventKey={3.2} href="#music">
              Music
          </MenuItem>
          <MenuItem eventKey={3.3} href="#videos">
              Videos
          </MenuItem>
          <MenuItem eventKey={3.4} href="#links">
              Links
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={4} href="#about">
              About Me
          </MenuItem>
        </NavDropdown>
      </Nav>
    );
  }

  unauthenticatedMenu(){
    return <span/>
  }

  render(){
    console.log("LeftMenu signin", this.props.user);
    // TODO: Mock Authenticated until I get passport in.
    return (this.props.user) ?
            this.authenticatedMenu() :
            this.unauthenticatedMenu();
  }
}

const mapStatetoProps = (state) => {
  return {
    user: state.user.user
  }
}


export default connect(mapStatetoProps, null)(LeftMenu)
