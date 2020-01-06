import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class AlterarCliente extends Component {
    state = {
        clientes: [],
        cliente: '',
        morada: '',
        nome: '',
        isAdmin: false
    }

    changeSelect = (e) => {
        const data = this.state.clientes.filter(el => el._id === e.target.value);
        this.setState({ cliente: data[0] },
            () => this.setState({ isAdmin: this.state.cliente.isAdmin }))
    };

    changeIsAdmin = (e) => {
        this.setState({ isAdmin: e.target.value == "true" ? true : false });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleClick1 = () => {
        this.props.history.push("/areacliente");
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios.put('https://10.9.10.37:3000/clientes/' + this.state.cliente._id,
            {
                "nome": this.state.nome != '' ? this.state.nome : this.state.cliente.nome,
                "morada": this.state.morada != '' ? this.state.morada : this.state.cliente.morada,
                "isAdmin": this.state.isAdmin
            }).then((response) => {
                window.alert("Dados do cliente alterados com sucesso!")
                this.refs.nome.value = ''
                this.refs.morada.value = ''
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })
    }

    async componentWillMount() {
        await axios.get('https://10.9.10.37:3000/clientes/').then(response => this.setState({ clientes: response.data }))
        console.log(this.state.clientes)
        this.setState({ data: true });
    }

    render() {
        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != ('true')) return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        );
        if (this.state.data != true) {
            return (
                <div>
                    LOADING...
                </div>
            )
        }
        return (
            <div className="card z-depth-0 project-summary">
                <h5 className="grey-text text-darken-3 center">Alterar dados</h5>
                <div>
                    <h6 className="grey-text text-darken-3" > Escolha o cliente a alterar </h6>
                    <select className="browser-default" onChange={this.changeSelect}>
                        <option value="none" key="" hidden> Selecione uma opção</option>
                        {this.state.clientes.map((e) => <option key={e._id} value={e._id}>{e.nome}</option>)}
                    </select>
                    <label> <h6><b>Nome: </b>{this.state.cliente.nome} </h6></label>
                    <br />
                    <h6 className="grey-text text-darken-3" > Indique os novos dados do cliente (em branco para não alterar)</h6>
                    <div className="input-field">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" required="true" ref="nome" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="morada">Morada</label>
                        <input type="text" id="morada" required="true" ref="morada" onChange={this.handleChange} />
                    </div>
                    <h6 className="grey-text text-darken-3">É administrador?</h6>
                    <select className="browser-default" onChange={this.changeIsAdmin}>
                        <option value="none" key="" hidden> Selecione uma opção</option>
                        <option value="true" key="true">Sim</option>
                        <option value="false" key="false">Não</option>
                    </select>
                </div>
                <div className="input-group">
                    <span className="input-group-btn">
                        <button className="btn pink lighten-1 z-depth-0" onClick={this.handleClick}>Gravar Alterações</button>
                    </span>
                    <div className="right" >
                        <button className="btn pink lighten-1 z-depth-0" onClick={this.handleClick1}>Voltar</button>
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

export default connect(mapStateToProps)(AlterarCliente)