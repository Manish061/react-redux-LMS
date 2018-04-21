import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import styles from './begin.scss';

export default class Begin extends React.Component {
    constructor() {
        super();
        this.state = {
            role: ''
        }
    }
    componentDidMount() {
        this.setState({
            role: this.props.role
        })
    }
    render() {
        const adminHome = (
            <div>
                <h2>Welcome Admin</h2>
                <ListGroup>
                    <Link to="/admin/addBook">
                        <ListGroupItem bsStyle="info">
                            Add Book
                        </ListGroupItem>
                    </Link>
                    <Link to="/admin/addBook">
                        <ListGroupItem bsStyle="warning">
                            Update Book
                        </ListGroupItem>
                    </Link>
                    <Link to="/admin/addBook">
                        <ListGroupItem bsStyle="info">
                            View Book
                        </ListGroupItem>
                    </Link>
                    <Link to="/admin/addBook">
                        <ListGroupItem bsStyle="warning">
                            Delete Book
                        </ListGroupItem>
                    </Link>
                </ListGroup>
            </div>)
        const userHome = (<h1>Welcome User</h1>)
        return (
            this.state.role === 'admin' ? adminHome : userHome
        )
    }
}