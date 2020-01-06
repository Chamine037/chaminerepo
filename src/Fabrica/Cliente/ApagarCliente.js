import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import { signOut } from '../../store/actions/login/authActions'

class ApagarCliente extends Component {
    constructor(props) {
        super(props);
    }
    handleClick = (e) => {
        e.preventDefault();
        if (window.confirm("Deseja realmente apagar a sua conta? Este ato é irreversível")) {
            axios.delete('https://10.9.10.37:3000/encomendas/deletebycliente/' + localStorage.getItem('cli_id'))
            axios.delete('https://10.9.10.37:3000/clientes/' + localStorage.getItem('cli_id')).then(this.props.signOut)
            this.render()
        }
        else {
            window.alert("Não foi possível apagar a conta.")
        }
    }

    render() {
        if (localStorage.getItem('logged') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        );
        return (
            <div className="center">
                <br />
                <span className="input-group-btn">
                    <button className="btn pink lighten-1 z-depth-0" onClick={this.handleClick}>Apagar conta</button>
                </span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(ApagarCliente)