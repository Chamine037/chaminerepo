import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import PlanoFabricoSumario from './PlanoFabricoSumario'


class ListarPlanoFabrico extends Component {
    state = {
        planosfabrico: []
    }

    handleClick1 = () => {
        this.props.history.push("/criarplanoFabrico");
    }

    handleClick2 = () => {
        this.props.history.push("/planofabricomenu");
    }

    render() {
        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        ); return (
            <div className="container">
                <br />
                <div className="input-group center">
                    <span className="input-group-btn">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Criar Plano de Fabrico</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick2}>Voltar</button>
                    </span>
                </div>
                <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <h2 className="grey-text text-darken-3 center">Lista de Planos de Fabrico</h2>
                    </div>
                </div>
                <div>
                    {this.state.planosfabrico.map((pf) =>
                        <PlanoFabricoSumario pf={pf} />)}
                </div>
                <br />
            </div>
        )
    }

    async componentWillMount() {
        axios.get('https://mdp37.azurewebsites.net/api/GetAllPlanosFabrico').then(response => this.setState({ planosfabrico: response.data }))
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ListarPlanoFabrico)