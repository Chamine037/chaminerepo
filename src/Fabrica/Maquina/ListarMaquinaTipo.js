import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import MaquinasSumario from './MaquinasSumario'

class ListarMaquinaTipo extends Component {
    state = {
        nome: '',
        tipo: '',
        maquinas: [],
        tipoMaquinas: []
    }

    changeSelect = (e) => {
        const data = this.state.tipoMaquinas.filter(el => el.id === e.target.value);
        this.setState({ tipo: data[0].tipo });
        this.setState({ id: data[0].id });
    }

    handleClick = (e) => {
        console.log(this.state)
        e.preventDefault();
        axios.get('https://mdf37.azurewebsites.net/api/maquina/' + this.state.id + '/GetMaquinasTipoMaquina').then(response => this.setState({ maquinas: response.data }))
    }

    handleClick1 = () => {
        this.props.history.push("/maquinamenu");
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

                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3 center">Lista de Máquinas por tipo</h5>

                    <div>
                        <select className="browser-default" onChange={this.changeSelect}>
                            <option value="none" key="" hidden> Selecione uma opção</option>
                            {this.state.tipoMaquinas.map((tm) =>
                                <option key={tm.id} value={tm.id}>{tm.tipo}</option>)}
                        </select>

                    </div>

                    <div className="input-group">
                        <span className="input-group-btn">
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Consultar Máquinas</button>
                            <div className="right" >
                                <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Voltar</button>
                            </div>
                        </span>
                    </div>
                </form>

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
        axios.get('https://mdf37.azurewebsites.net/api/TipoMaquina/GetAllTipoMaquinas').then(response => this.setState({ tipoMaquinas: response.data }))
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ListarMaquinaTipo)