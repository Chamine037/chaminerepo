import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter, Redirect } from 'react-router-dom'
import { criarMaquina } from '../../store/actions/maquina/MaquinaActions'
import axios from 'axios'


class CriarMaquina extends Component {
    state = {
        id: '',
        nome: '',
        tipo: '',
        tipoMaquina: [],
        marca: '',
        modelo: '',
        localizacao: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClick = () => {
        this.props.history.push("/maquinamenu");
    }

    changeSelect = (e) => {
        console.log(this.state.tipo)
        this.setState({
            tipo: e.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("AVISO", this.state)
        axios.post('https://mdf37.azurewebsites.net/api/maquina',
            {
                "nome": this.state.nome,
                "marca": this.state.marca,
                "modelo": this.state.modelo,
                "localizacao": this.state.localizacao,
                "tipo": this.state.tipo
            }).then((response) => {
                window.alert("Máquina criada com sucesso!")
                document.getElementById("abanador").reset();
                this.setState({
                    nome: '',
                    tipo: '',
                    marca: '',
                    modelo: '',
                    localizacao: ''
                })

                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })
    }

    async componentWillMount() {
        axios.get('https://mdf37.azurewebsites.net/api/TipoMaquina/GetAllTipoMaquinas').then(response => this.setState({ tipoMaquina: response.data }))
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
                <form id="abanador" onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Criar nova maquina</h5>
                    <div className="input-field">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" required="true" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="marca">Marca</label>
                        <input type="text" id="marca" required="true" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="modelo">Modelo</label>
                        <input type="text" id="modelo" required="true" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="localizacao">Localização</label>
                        <input type="text" id="localizacao" required="true" onChange={this.handleChange} />
                    </div>
                    <div>
                        <select className="browser-default" value={this.state.tipo}
                            onChange={(e) => this.setState({ tipo: e.target.value }, console.log(this.state.tipo))}>
                            <option value="none" key="" hidden> Selecione uma opção</option>
                            {this.state.tipoMaquina.map((tm) =>
                                <option key={tm.id} value={tm.id}>{tm.tipo}</option>)}
                        </select>
                    </div>
                    <div className="input-field">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}}>Criar</button>
                        <div className="right" >
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Voltar</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("pipipi", state)
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        criarMaquina: (maquina) => dispatch(criarMaquina(maquina))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CriarMaquina)



