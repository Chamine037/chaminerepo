import React, { Component } from 'react'
import { connect } from 'react-redux'
import MaquinasSumario from './MaquinasSumario'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'


class ListarMaquinas extends Component {
    state = {
        nome: '',
        maquinas: []
    }

    handleClick = () => {
        this.props.history.push("/criarmaquina");
    }

    handleClick1 = () => {
        this.props.history.push("/maquinamenu");
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
            <div className="container">
                <br />
                <div className="input-group">
                    <span className="input-group-btn">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Criar Máquina</button>
                        <div className="right" >
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Voltar</button>
                        </div>
                    </span>
                </div>

                <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <h2 className="grey-text text-darken-3 center">Lista de Máquinas</h2>
                    </div>
                </div>

                <div className="mostrarmaquinas-group">
                    <label> <h6>
                        {this.state.maquinas.map((m) => (
                            <MaquinasSumario maquina={m} />))}
                    </h6>
                    </label>
                </div>

            </div>
        )
    }

    async componentWillMount() {
        await axios.get('https://mdf37.azurewebsites.net/api/GetAllMaquinas').then(response => this.setState({ maquinas: response.data }))
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ListarMaquinas)