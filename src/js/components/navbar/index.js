import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import styles from './navbar.scss';

export default class navbar extends React.PureComponent {
    constructor() {
        super();
    }
    render() {
        return (
            <div className={styles.headerWrapper}>
                <div className={styles.headerInner}>
                    <Navbar collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#brand">Any Time Library</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavItem eventKey={1} href="#">Link</NavItem>
                                <NavItem eventKey={2} href="#">Link</NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            </div>
        )
    }
}


