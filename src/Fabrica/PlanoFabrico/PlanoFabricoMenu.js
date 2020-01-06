import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter, Redirect } from 'react-router-dom'

class PlanoFabricoMenu extends Component {


    handleClick1 = () => {
        this.props.history.push("/criarplanofabrico");
    }

    handleClick2 = () => {
        this.props.history.push("/listarplanosfabrico");
    }

    handleClick3 = () => {
        this.props.history.push("/consultarplanofabricoproduto");
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
            <div className="card z-depth-0 project-summary white">
                <h5 className="grey-text text-darken-3 center">Plano de Fabrico</h5>
                <br />
                <div className="input-group center">
                    <span className="input-group-btn">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Criar Plano de Fabrico</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick2}>Consultar Planos de Fabrico</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick3}>Consultar Plano de Fabrico de Produto</button>
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

export default connect(mapStateToProps)(PlanoFabricoMenu)