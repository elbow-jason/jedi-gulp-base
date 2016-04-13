import React, { Component } from 'react';
import { Navbar }           from 'react-bootstrap';
import { Nav }              from 'react-bootstrap';
import { NavItem }          from 'react-bootstrap';
import { NavDropdown }      from 'react-bootstrap';
import { MenuItem }         from 'react-bootstrap';

import LeftMenu             from './LeftMenu';
import RightMenu            from './RightMenu';

export default class Header extends Component {

  render(){
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">{ "Jedi Base" }</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <LeftMenu />
          <RightMenu />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}


