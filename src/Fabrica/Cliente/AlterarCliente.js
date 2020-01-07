import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class AlterarCliente extends Component {
    state = {
        id: '',
        nome: '',
        morada: '',
        clientes: '',
    }

    changeSelect = (e) => {
        const data = this.state.clientes.filter(el => el.nome === e.target.value);
        this.setState({ id: data[0]._id });
        this.setState({ nome: data[0].nome });
        this.setState({ morada: data[0].morada });
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state, [e.target.id]: value
        });
    };

    handleClick1 = () => {
        this.props.history.push("/areacliente");
    }

    handleClick = (e) => {
        e.preventDefault();
        console.log("AVISO", this.state);
        if (this.state.nome != '' || this.state.morada != '') {
            axios.put('https://10.9.10.37:3000/clientes/' + localStorage.getItem('cli_id'),
                {
                    "nome": this.state.nome,
                    "morada": this.state.morada,
                    "isAdmin" : localStorage.getItem('isAdmin')
                }).then((response) => {
                    window.alert("Dados do cliente alterados com sucesso!")
                    console.log(response);
                    this.props.history.push("/areacliente");
                }, (error) => {
                    console.log(error);
                    window.alert("Sem sucesso!")
                })
        } else {
            window.alert("Nome ou morada não pode estar em branco!")
        }

    }

    async componentWillMount() {
        await axios.get('https://10.9.10.37:3000/clientes/' + localStorage.getItem('cli_id')).then(response => this.setState({ clientes: response.data }))
        this.setState({ data: true });
    }

    render() {
        if (localStorage.getItem('logged') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        );
        return (

            <div className="card z-depth-0 project-summary">

                <h5 className="grey-text text-darken-3 center">Alterar dados</h5>
                <div>
                    <label> <h6><b>Nome: </b>{this.state.clientes.nome} </h6></label>
                    <br />
                    <label> <h6><b>Morada: </b>{this.state.clientes.morada} </h6></label>
                    <br />
                    <h6 className="grey-text text-darken-3" > Indique os novos dados do cliente </h6>
                    <div className="input-field">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" required="true" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="morada">Morada</label>
                        <input type="text" id="morada" required="true" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="input-group">
                    <span className="input-group-btn">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Gravar Alterações</button>
                    </span>&nbsp;&nbsp;
                    <div className="right" >
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Voltar</button>
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