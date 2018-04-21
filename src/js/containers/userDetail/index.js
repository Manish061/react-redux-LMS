import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class UserDetails extends React.Component {
    render() {
        if (!this.props.user) {
            return (
                <p>select a user</p>
            )
        }
        return (
            <div>
                <h2>Name:{this.props.user.first} {this.props.user.last}</h2>
                <img src={this.props.user.thumbnail} />
                <h2>Age:{this.props.user.age}</h2>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.activeUser
    }
}
/* making the component aware of component data */
export default connect(mapStateToProps)(UserDetails);