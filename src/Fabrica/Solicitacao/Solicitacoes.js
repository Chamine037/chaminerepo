import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import SolicitacaoSumario from './SolicitacaoSumario';


class Solicitacoes extends Component {
    state = {
        solicitacoes: [],
        solicitacao: '',
        nova_quantidade: '',
        nova_data_conclusao: '',
        data_solicitacao: '',
        cancelar_encomenda: '',
        encomendaid: '',
        cliente: '',
        produto: '',
        data: false
    }

    handleClick = (e) => {
        e.preventDefault();
        if (this.state.cancelar_encomenda == false) {
            axios.put('https://10.9.10.37:3000/encomendas/' + this.state.encomendaid,
                {
                    "quantidade": this.state.nova_quantidade,
                    "data_conclusao": this.state.nova_data_conclusao,
                    "estado": "Ativa"
                },
                {
                    headers: { "cliente": localStorage.getItem('cli_id') }
                }).then((response) => {
                    axios.delete('https://10.9.10.37:3000/solicitacao/' + this.state.solicitacao)
                    this.props.history.push("/encomendas");
                    window.alert("Encomenda alterada com sucesso!")

                    console.log(response);
                }, (error) => {
                    console.log(error);
                    window.alert("Sem sucesso!")
                })
        } else {
            axios.put('https://10.9.10.37:3000/encomendas/' + this.state.encomendaid,
                {
                    "quantidade": 0,
                    "data_conclusao": 0,
                    "estado": "Inativa"
                },
                {
                    headers: { "cliente": localStorage.getItem('cli_id') }
                }).then((response) => {
                    axios.delete('https://10.9.10.37:3000/solicitacao/' + this.state.solicitacao)
                    this.props.history.push("/encomendas");
                    window.alert("Encomenda cancelada com sucesso!")

                    console.log(response);
                }, (error) => {
                    console.log(error);
                    window.alert("Sem sucesso!")
                })
        }

    };
    handleClick3 = (e) => {
        e.preventDefault();
        axios.delete('https://10.9.10.37:3000/solicitacao/' + this.state.solicitacao,
            {
            },
            {
                headers: { "cliente": localStorage.getItem('cli_id') }
            }).then((response) => {
                this.props.history.push("/encomendas");
                window.alert("Solicitacao cancelada com sucesso!")
                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })

    };

    handleClick2 = () => {
        this.props.history.push("/encomendas");
    }
    changeSelect = (e) => {
        this.setState({ nova_data_conclusao: "0" });
        this.setState({ data_solicitacao: "0" });
        const data = this.state.solicitacoes.filter(el => el._id === e.target.value);
        this.setState({ solicitacao: data[0]._id });
        this.setState({ nova_data_conclusao: data[0].nova_data_conclusao });
        this.setState({ data_solicitacao: data[0].data_solicitacao });
        this.setState({ cancelar_encomenda: data[0].cancelar_encomenda });
        this.setState({ encomendaid: data[0].encomenda });
        this.setState({ nova_quantidade: data[0].nova_quantidade });
        this.setState({ cliente: data[0].cliente });
        this.setState({ produto: data[0].produto });
    };


    render() {
        if (localStorage.getItem('logged') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        )
        if (this.state.data !== true) {
            return (
                <div>
                    LOADING...
                </div>
            )
        }
        return (
            <div className="card z-depth-0 project-summary" >
                <div>
                    <select className="browser-default" onChange={this.changeSelect}>
                        <option value="none" key="" hidden> Selecione uma opção</option>
                        {this.state.solicitacoes.map(
                            (m) =>
                                <option key={m._id} value={m._id}>{m.cliente} - {m.produto}</option>)}
                    </select>
                </div>
                <div>
                    <br />
                    Cliente: {this.state.cliente}
                    <br />
                    Produto: {this.state.produto}
                    <br />   <br />
                    Data da solicitacao: {this.state.data_solicitacao}
                    <br />                <br />
                    Nova quantidade:{this.state.nova_quantidade}
                    <br />
                    Nova data de conclusao:{this.state.nova_data_conclusao}
                    <br />                <br />
                    Cancelamento da encomenda:
                <input value={this.state.cancelar_encomenda}></input>
                    <br />      <br />
                    <div className="input-group ">
                        <span className="input-group-btn">
                            <button className="btn pink lighten-1 z-depth-0" onClick={this.handleClick}>Validar solicitacao</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn pink lighten-1 z-depth-0" onClick={this.handleClick3}>Cancelar solicitacao</button>
                            <button className="btn pink lighten-1 z-depth-0 right" onClick={this.handleClick2}>Voltar</button>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    async componentWillMount() {
        axios.get('https://10.9.10.37:3000/solicitacao/').then(response => {
            this.setState({ solicitacoes: JSON.parse(JSON.stringify(response.data)) }, () => {
                this.setState({ data: true })
            })
        });
    }
}

export default Solicitacoes