import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default function AppNav() {

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Expense Tracker</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link className="nav-link" to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/categories/">Categories</Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/expenses/">Expenses</Link>
          </NavItem>
        </Nav>
      </Navbar>
    </div>);
}