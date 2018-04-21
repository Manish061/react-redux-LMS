import React from 'react';
import { Route, Router } from 'react-router'
import Begin from './begin'
import Login from "../containers/login"
import Register from '../containers/register'
import UserDetails from '../containers/userDetail'
import Navbar from '../components/navbar'
var styles = require('./app.scss')
require('../../scss/style.scss');
require('../../../css/global.css')

export default class App extends React.Component {

    render() {

        return (
            <div className={styles.pageContainer}>
                <Navbar />
                <div className={styles.mainContentWrapper}>
                    <div className={styles.mainContentInner}>
                        <div className={styles.appWarrper}>
                            <div className={styles.appInnerContainer}>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}