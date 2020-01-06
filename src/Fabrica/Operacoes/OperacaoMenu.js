import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class OperacaoMenu extends Component {

    handleClick = () => {
        this.props.history.push("/criaroperacao");
    }

    handleClick1 = () => {
        this.props.history.push("operacoes")
    }

    handleClick2 = () => {
        this.props.history.push("/listaroperacaotipo")
    }

    render() {
        const { auth } = this.props;
        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        ); return (
            <div className="card z-depth-0 project-summary">
                <h5 className="grey-text text-darken-3 center">Operação</h5>
                <br />
                <div className="input-group center">
                    <span className="input-group-btn">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Criar Operação</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Consultar Operações</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick2}>Consultar Operações de Tipo de Máquina</button>
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

export default connect(mapStateToProps)(OperacaoMenu)
