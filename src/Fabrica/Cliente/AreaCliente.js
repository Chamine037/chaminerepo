import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class AreaCliente extends Component {

    handleClick = () => {
        this.props.history.push("/alterarcliente");
    }

    handleClick1 = () => {
        this.props.history.push("/consultarcliente");
    }

    handleClick3 = () => {
        this.props.history.push("/");
    }

    handleClick2 = () => {
        this.props.history.push("/consultarasadmin");
    }

    handleClick4 = () => {
        this.props.history.push("/alterarclientes");
    }

    apagarConta = () => {
        this.props.history.push("/apagarconta");
    }

    render() {
        if (localStorage.getItem('logged') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        );
        if (localStorage.getItem('isAdmin') != ('true')) {
            return (
                <div className="card z-depth-0 project-summary">
                    <span className="input-group-btn">
                        <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick1}>Consultar Dados</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick2}>Consultar Dados Clientes</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Alterar Dados</button>
                        <div className="right" >
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.apagarConta}>Apagar Conta</button>&nbsp;&nbsp;&nbsp;
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick3}>Voltar</button>
                        </div>
                    </span>
                </div >
            )
        }
        return (
            <div className="card z-depth-0 project-summary">
                <span className="input-group-btn">
                    <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick1}>Consultar Dados</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick2}>Consultar Dados Clientes</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick}>Alterar Dados</button>
                    <div className="right" >
                        <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick4}>Alterar Clientes</button>&nbsp;&nbsp;&nbsp;
                        <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick3}>Voltar</button>
                    </div>
                </span>
            </div >
        )
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(AreaCliente)