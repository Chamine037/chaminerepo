import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import MaquinasSumario from './MaquinasSumario'

class AlterarMaquinaTipo extends Component {
    state = {
        id: '',
        tipoMaquina: [],
        maquinasAlterar: [],
        listaMaquinas: [],
        data: false,
        tipo: '',
        maquina: {
            tipo: '',
            ativa: ''
        }
    }

    changeSelect = (e) => {
        const data = this.state.listaMaquinas.filter(el => el.id === e.target.value);
        this.setState({ maquina: data[0] });
    };

    changeSelect2 = (e) => {
        const data = this.state.tipoMaquina.filter(el => el.id === e.target.value);
        this.setState({ tipo: data[0] });
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state, [e.target.name]: value
        });
    };

    handleClick = (e) => {
        e.preventDefault();
        axios.put('https://mdf37.azurewebsites.net/api/maquina/' + this.state.maquina.id + '/' + this.state.tipo.id)
            .then((response) => {
                window.alert("Maquina alterada com sucesso!")
                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })
    }

    handleClick1 = () => {
        this.props.history.push("/maquinamenu");
    }

    async componentWillMount() {
        await axios.get('https://mdf37.azurewebsites.net/api/GetAllMaquinas').then(response => this.setState({ listaMaquinas: response.data }))
        await axios.get('https://mdf37.azurewebsites.net/api/TipoMaquina/GetAllTipoMaquinas').then(response => this.setState({ tipoMaquina: response.data }))
        this.setState({ data: true });
    }

    render() {
        if (this.state.data !== true) {
            return (
                <div>
                    LOADING...
                </div>
            )
        }

        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        ); return (
            <div className="container">
                <div className="card z-depth-0 project-summary">

                    <h5 className="grey-text text-darken-3 center">Alterar máquina</h5>
                    <div>

                        <select className="browser-default" onChange={this.changeSelect}>
                            <option value="none" key="" hidden> Selecione uma opção</option>
                            {this.state.listaMaquinas.map(
                                (m) =>
                                    <option key={m.id} value={m.id}>{m.nome} </option>)}
                        </select>

                        <div >
                            <MaquinasSumario maquina={this.state.maquina} />
                        </div>

                        <br />
                    </div>
                </div>

                <div className="card z-depth-0 project-summary">
                    <h5 className="grey-text text-darken-3 center" > Selecione um novo tipo de máquina para a máquina</h5>
                    <select className="browser-default" onChange={this.changeSelect2}>
                        <option value="none" key="" hidden> Selecione uma opção</option>
                        {this.state.tipoMaquina.map(
                            (tm) =>
                                <option key={tm.id} value={tm.id}>{tm.tipo} </option>)}
                    </select>

                    <div className="input-group">
                        <span className="input-group-btn">
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Gravar Alterações</button>
                            <div className="right" >
                                <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Voltar</button>
                            </div>
                        </span>
                    </div>
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

export default connect(mapStateToProps)(AlterarMaquinaTipo)