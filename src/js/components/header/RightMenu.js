import React, { Component } from 'react';
import { Nav }              from 'react-bootstrap';
import { NavItem }          from 'react-bootstrap';
import { NavDropdown }      from 'react-bootstrap';
import { MenuItem }         from 'react-bootstrap';

import { connect }          from 'react-redux';
import * as actions         from '../../actions';

class RightMenu extends Component {

  authenticatedMenu(){
    return (
      <Nav pullRight>
        <NavDropdown eventKey={3} title={ formatUserName(this.props.user) }
                     id="basic-nav-dropdown" className="right-menu">
          <MenuItem eventKey={3.1} href="#profile">
            { "Profile" }
          </MenuItem>
          <MenuItem eventKey={3.2} onClick={ this.props.handleSignoutClick } >
            { "Sign Out" }
          </MenuItem>
        </NavDropdown>
      </Nav>
    );
  }

  unauthenticatedMenu(){
    return (
      <Nav pullRight>
        <NavItem eventKey={6} href="#signin" >
          { "Sign In" }
        </NavItem>
        <NavItem eventKey={7} href="#signup" className="right-menu">
         { "Sign Up" }
        </NavItem>
      </Nav>
    );
  }

  render(){
    // TODO: Mock Authenticated until I get passport in.
    // var menuInstance = null;
    console.log("RightMenu", this.props);
    return  this.props.user ?
            this.authenticatedMenu() :
            this.unauthenticatedMenu();
  }
}

const formatUserName = (user) => {
  let { first_name, last_name } = user;
  if (first_name && last_name) return `${first_name} ${last_name}`;
  if (user.email) return user.email;
  return 'User';
}

const mapStatetoProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return { handleSignoutClick:  actions.signout }
}

export default connect(mapStatetoProps, mapDispatchToProps)(RightMenu)