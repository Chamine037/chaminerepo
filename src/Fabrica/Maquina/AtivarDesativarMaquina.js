import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import MaquinasSumario from './MaquinasSumario'

class AtivarDesativarMaquina extends Component {
    state = {
        id: '',
        ativa: '',
        maquinas: [],
        maq: [],
        rest: []
    }

    changeSelect = (e) => {
        const data = this.state.maquinas.filter(el => el.id === e.target.value);
        this.setState({ id: data[0].id });
        this.setState({ ativa: data[0].ativa.toString() });
        var x = [];
        x.push(data[0]);
        this.setState({ maq: x });

    }

    handleClick = (e) => {
        e.preventDefault();
        if (this.state.ativa == "true") {
            axios.put('https://mdf37.azurewebsites.net/api/activity/' + this.state.id + '/false',
            ).then((response) => {
                console.log(response);
                window.alert("Maquina Desativada com sucesso!")
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })
        } else {
            axios.put('https://mdf37.azurewebsites.net/api/activity/' + this.state.id + '/true',
            ).then((response) => {
                console.log(response);
                window.alert("Maquina Ativada com sucesso!")
                window.location.reload();
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })

        }

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
                    <h5 className="grey-text text-darken-3 center">Lista de Máquinas</h5>

                    <div>
                        <select className="browser-default" onChange={this.changeSelect}>
                            <option> Selecione uma opção</option>
                            {this.state.maquinas.map((m) =>
                                <option key={m.id} value={m.id}>{m.nome}</option>)}
                        </select>

                    </div>

                    <div className="input-group">
                        <span className="input-group-btn">
                            <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick}>Ativar/Desativar</button>
                            <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick1}>Voltar</button>
                        </span>
                    </div>
                    <div className="mostrarmaquinas-group">
                        <label> <h6>
                            {this.state.maq.map((m) => (
                                <MaquinasSumario maquina={m} />))}
                        </h6>
                        </label>
                    </div>
                </form>


            </div>
        )
    }

    async componentWillMount() {
        await axios.get('https://mdf37.azurewebsites.net/api/GetAllMaquinas').then(response => this.setState({ maquinas: response.data }))
        await axios.get('https://mdf37.azurewebsites.net/api/GetAllLinhasProducao').then((response) => {
            this.setState({ lp: response.data })
        })
    }
}


const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(AtivarDesativarMaquina)