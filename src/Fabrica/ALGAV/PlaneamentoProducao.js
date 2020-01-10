import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class PlaneamentoProducao extends Component {

    handleClick = () => {
        this.props.history.push("/balanceamentolinhas");
    };

    handleClick1 = () => {
        this.props.history.push("/agendastemporais")
    };

    handleClick2 = () => {
        this.props.history.push("/baseconhecimentos")
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
            <div className="card z-depth-0 project-summary">
                <h5 className="grey-text text-darken-3 center">Planeamento de Produção</h5>
                <br />
                <div className="input-group center">
                    <span className="input-group-btn">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Balanceamento de linhas</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Agendas temporais</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick2}>Base de conhecimentos</button> &nbsp;&nbsp;&nbsp;
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

export default connect(mapStateToProps)(PlaneamentoProducao)
