import React, { Component } from 'react';
import { connect } from 'react-redux'
import { HashRouter, Redirect } from 'react-router-dom'
class DashBoard extends Component {
    render() {
        const { auth } = this.props;
        ////if \(!auth\.isLoaded\) return null
        if (localStorage.getItem('logged') != 'true') return <Redirect to='/signin' />
        return (
            <div className="DashBoard container">
                <div className="row">
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps)(DashBoard)