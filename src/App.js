import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./stylesheets/App.css";
import Routes from "./Routes";

class App extends Component {
    render() {
        return (
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Testnet3</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to="/create">
                                <NavItem>Create Address</NavItem>
                            </LinkContainer>
                        </Nav>

                        <Nav>
                            <LinkContainer to="/fund">
                                <NavItem>Fund</NavItem>
                            </LinkContainer>
                        </Nav>
                        <Nav>
                            <LinkContainer to="/balance">
                                <NavItem>Check Balance</NavItem>
                            </LinkContainer>
                        </Nav>
                        <Nav>
                            <LinkContainer to="/send">
                                <NavItem>Send Transaction</NavItem>
                            </LinkContainer>
                        </Nav>
                        <Nav>
                            <LinkContainer to="/history">
                                <NavItem>View History</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes />
            </div>
        );
    }
}

export default App;