import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormControl, Jumbotron, Button, Glyphicon ,InputGroup} from 'react-bootstrap';
import { loggedInUser } from '../../actions';
import Begin from '../../components/begin';
import styles from './login.scss';
import { withRouter } from 'react-router-dom';


class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            existingUser: false,
            role: ''
        }
        this.LoginUser = this.LoginUser.bind(this)
    }
    LoginUser(userID, password) {
        return this.props.users.users.map((user) => {
            if (document.getElementById("userName").value === user.userName && document.getElementById("password").value === user.password) {
                console.log("user found")
                this.setState({
                    existingUser: true,
                    role: user.role
                })
            }
            this.props.loggedInUser(document.getElementById("userName").value, document.getElementById("password").value);
        })
    }
    render() {
        const loggedin = (
            <div id="loginContainer" className={styles.loginWarrper}>
                <div id="loginInnerContainer" className={styles.loginInnerContainer}>
                    <Jumbotron>
                        <div className={styles.formContainer}>
                            <form>
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
                                <Button onClick={() => { this.LoginUser() }} bsStyle="success">Login</Button><br />
                                <Link to="#">forgot password?</Link><br />
                                <Link to="/register">Not a registered user?Register Now!</Link>
                            </form>
                        </div>
                    </Jumbotron>
                </div>
            </div>
        )
        return (
            this.state.existingUser ? <div><Begin role={this.state.role}/></div> : loggedin
        )
    }
}
/* take a piece of application data and passes it in the component as a property */
function mapStateToProps(state) {
    return {
        users: state.allReducers.users
    }
}
/* to connnect the action to redux */
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ loggedInUser: loggedInUser }, dispatch)
}
/* making the component aware of component data */
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(Login));