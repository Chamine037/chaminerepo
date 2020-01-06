import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter, Redirect } from 'react-router-dom'

class EncomendaMenu extends Component {


    handleClick1 = () => {
        this.props.history.push("/criarencomendas");
    };

    handleClick2 = () => {
        this.props.history.push("/consultarencomendas");
    };

    handleClick3 = () => {
        this.props.history.push("/cancelarencomendas");
    };

    handleClick4 = () => {
        this.props.history.push("/alterarencomendas");
    };

    handleClick5 = () => {
        this.props.history.push("/historicoencomendas");
    };

    handleClick6 = () => {
        this.props.history.push("/consultarencomendascliente");
    }
    handleClick7 = () => {
        this.props.history.push("/consultarencomendaprodutomais");
    };
    handleClick8 = () => {
        this.props.history.push("/solicitacoes");
    }


    render() {
        const { auth } = this.props;
        //if \(!auth\.isLoaded\) return null
        if (localStorage.getItem('logged') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        );
        if (localStorage.getItem('isAdmin') === "false") {
            return (
                <div className="card z-depth-0 project-summary white">
                    <h5 className="grey-text text-darken-3 center">Encomendas</h5>
                    <br />
                    <div className="input-group center">
                        <span className="input-group-btn">
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick5}>Historico de encomenda</button>
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick6}>Consultar Encomendas</button>
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}}
                                onClick={this.handleClick1}>Criar Encomenda</button>
                            &nbsp;&nbsp;&nbsp;
                        </span>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="card z-depth-0 project-summary white">
                    <h5 className="grey-text text-darken-3 center">Encomendas</h5>
                    <br />
                    <div className="input-group center">
                        <span className="input-group-btn">
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick5}>Historico de encomenda</button>
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick2}>Consultar Encomendas</button>
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick4}>Alterar Encomenda</button>
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}}  onClick={this.handleClick3}>Cancelar Encomenda</button>
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}}  onClick={this.handleClick8}>Solicitacoes de alteracao</button>
                        </span>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(EncomendaMenu)