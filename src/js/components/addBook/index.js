import React from 'react';
import { Link } from 'react-router-dom';
import { FormControl, Jumbotron, Button, Glyphicon, InputGroup } from 'react-bootstrap';
export default class AddBook extends React.Component {
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
        return (
            <form>
                <label>ISBN:</label>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph="book" /></InputGroup.Addon>
                    <FormControl type="text" id="isbn" required={true} />
                </InputGroup>
                <label>Book Name:</label>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph="book" /></InputGroup.Addon>
                    <FormControl type="text" id="bookName" required={true} />
                </InputGroup>
                <label> Author:</label>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph="user" /></InputGroup.Addon>
                    <FormControl type="text" id="authorName" required={true} />
                </InputGroup>
                <label>Description:</label>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph="edit" /></InputGroup.Addon>
                    <FormControl type="textarea" id="description" required={true} />
                </InputGroup>
                <label>categories:</label>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph="asterisk" /></InputGroup.Addon>
                    <FormControl type="text" id="categories" required={true} />
                </InputGroup>
                <label>publisher:</label>
                <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph="print" /></InputGroup.Addon>
                    <FormControl type="text" id="publisher" required={true} />
                </InputGroup>
            </form>
        )
    }
}