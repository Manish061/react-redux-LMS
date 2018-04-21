import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormControl, Jumbotron, Button, Glyphicon ,InputGroup} from 'react-bootstrap';
import { registerUser } from '../../actions';
import Begin from '../../components/begin';
import styles from './register.scss'
import { withRouter } from 'react-router-dom';

 class Register extends React.Component {
    constructor() {
        super();
        this.RegisterUser = this.RegisterUser.bind(this)
    }
    RegisterUser(user) {
        return (this.props.registerUser(user))
    }
    render() {
        return (
            <div id="registerContainer" className={styles.registerWarrper}>
                <div id="registerInnerContainer" className={styles.registerInnerContainer}>
                    <Jumbotron>
                        <div className={styles.formContainer}>
                        <label>User Name:</label>
                                <InputGroup>
                                <InputGroup.Addon><Glyphicon glyph="user" /></InputGroup.Addon>
                                <FormControl type="text" id="userName" required={true} />
                                </InputGroup>
                                <label>Password:</label>
                                <InputGroup>
                                <InputGroup.Addon><Glyphicon glyph="eye-close" /></InputGroup.Addon>
                                <FormControl type="password" id="password" required={true} />
                                </InputGroup>
                                <label>Confirm Password:</label>
                                <InputGroup>
                                <InputGroup.Addon><Glyphicon glyph="eye-close" /></InputGroup.Addon>
                                <FormControl type="confirmPassword" id="password" required={true} />
                                </InputGroup>
                            <Button onClick={() => { this.RegisterUser() }} bsStyle="success">Register</Button><br />
                            <a href="/">Already Registered?click here to Login </a>
                        </div>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}
/* take a piece of application data and passes it in the component as a property */
function mapStateToProps(state) {
    return {
        users: state.users
    }
}
/* to connnect the action to redux */
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ registerUser: registerUser }, dispatch)
}
/* making the component aware of component data */
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Register));