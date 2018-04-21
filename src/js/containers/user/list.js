import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectUser } from '../../actions';

class UserList extends React.Component {
    constructor() {
        super();
        this.createListItems = this.createListItems.bind(this)
    }
    createListItems() {
        return this.props.users.map((user) => {
            return (
                <li key={user.id} onClick={()=>{this.props.selectUser(user)}}>
                {user.first} {user.last}
                </li>
            )
        })
    }
    render() {
        return (
            <ul>
                {this.createListItems()}
            </ul>
        )
    }
}
/* take a piece of apllication data and passes it in the component as a property */
function mapStateToProps(state) {
    return {
        users: state.users
    }
}
/* to connnect the action to redux */
function matchDispatchToProps(dispatch) {
    return bindActionCreators({ selectUser: selectUser },dispatch)
}
/* making the component aware of component data */
export default connect(mapStateToProps,matchDispatchToProps)(UserList);