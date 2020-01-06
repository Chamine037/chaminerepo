import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class Listar extends Component {



    handleClick = () => {
        this.props.history.push("/criarmaquina");
    }

    handleClick1 = () => {
        this.props.history.push("/maquina")
    }

    handleClick2 = () => {
        this.props.history.push("/listarmaquinatipo")
    }

    handleClick3 = () => {
        this.props.history.push("/alterarmaquinatipo")
    }
    handleClick4 = () => {
        this.props.history.push("/ativardesativarmaquina")
    }

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
            <div className="card z-depth-0 project-summary">
                <h5 className="grey-text text-darken-3 center">Máquina</h5>
                <br />
                <div className="input-group center">
                    <span className="input-group-btn">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Criar Máquina</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Consultar Máquinas</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick2}>Consultar Máquina por Tipo</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick3}>Alterar Tipo de Máquina</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick4}>Ativar/Desativar Máquina</button>
                    </span>
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

export default connect(mapStateToProps)(Listar)
