import React, { Component } from 'react'
import { criarOperacao } from '../../store/actions/operacao/OperacaoActions'
import { connect } from 'react-redux'
import { HashRouter, Redirect } from 'react-router-dom'

import axios from 'axios'

class CriarOperacao extends Component {
    state = {
        id: '',
        nome: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClick = () => {
        this.props.history.push("/operacaomenu");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://mdf37.azurewebsites.net/api/operacao',
            {
                "nome": this.state.nome
            }).then((response) => {
                this.props.criarOperacao({
                    id: response.data.id,
                    nome: response.data.nome
                })
                window.alert("Operação criada com sucesso!")
                document.getElementById("abanador").reset();
                this.setState({
                    nome: ''
                })
                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })
    }
    render() {
        const { auth } = this.props;
        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        );
        return (

            <div className="container">
                <form id="abanador" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Criar nova operacao</h5>
                    <div className="input-field">
                        <label htmlFor="nome">Nome da Operação</label>
                        <input type="text" id="nome" required="true" onChange={this.handleChange} />
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
        criarOperacao: (operacao) => dispatch(criarOperacao(operacao))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CriarOperacao)
