import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter, Redirect } from 'react-router-dom'

class TipoMaquinaMenu extends Component {


    handleClick = () => {
        this.props.history.push("/criartipomaquina");
    }

    handleClick2 = () => {
        this.props.history.push("/listartipomaquina");
    }

    handleClick3 = () => {
        this.props.history.push("/alterartipomaquinaoperacao");
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
            <div className="card z-depth-0 project-summary white">
                <h5 className="grey-text text-darken-3 center">Tipo de Máquina</h5>
                <br />
                <div className="input-group center">
                    <span className="input-group-btn">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Criar Tipo de Máquina</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick2}> Consultar Tipo de Máquinas </button> &nbsp;&nbsp;&nbsp;
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick3}>Alterar Tipo de Máquina</button>
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    //state.operacao.operacoes.map((nome) => { console.log(nome.nome, nome.id)})
    /*for( var x in state.operacao.operacoes){
      console.log(x, state.operacao.operacoes[x])
    }*/
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(TipoMaquinaMenu)