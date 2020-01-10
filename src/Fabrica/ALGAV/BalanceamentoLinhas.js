import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'


class BalanceamentoLinhas extends Component {
    state = {
        balanceamento: []
    };

    render() {
        const { auth } = this.props;
        //if \(!auth\.isLoaded\) return null
        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        ); return (
            <div className="container">
                <br />

                <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <h2 className="grey-text text-darken-3 center">Balanceamento de linhas</h2>
                    </div>
                </div>

                <div className="mostrarbalanceamento-group">
                    <label> <h6>
                        {this.state.balanceamento}
                    </h6>
                    </label>
                </div>

            </div>
        )
    }

    async componentWillMount() {
        await axios.get('http://10.9.10.37:5000/balanceamento').then(response => this.setState({ balanceamento: response.data }))
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(BalanceamentoLinhas)