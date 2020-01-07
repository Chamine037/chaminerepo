import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class SolicitarAlteracao extends Component {
    state = {
        encomendas: [],
        id: '',
        produto: '',
        quantidade: '',
        data_conclusao: '',
        cliente: '',
        produto: '',
        data_solicitacao: new Date()
    };

    changeSelect = async (e) => {
        const data = this.state.encomendas.filter(el => el._id === e.target.value);
        this.setState({ id: data[0]._id });
        this.setState({ produto: data[0].produto[0] });
        this.setState({ quantidade: data[0].quantidade });
        this.setState({ estado: data[0].estado });
        var dateConc = data[0].data_conclusao.split('T')[0];
        this.setState({ data_conclusao: dateConc });
        this.setState({ produto: data[0].produto[0].nome })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    };

    changeEstado = async (e) => {
        this.setState({ estado: e.target.value });
    };

    handleClick = (e) => {
        e.preventDefault();
        axios.get('https://10.9.10.37:3000/solicitacao/solicitacao/' + this.state.id).then((response) => {
            if (response.data.length != 0) {
                axios.delete('https://10.9.10.37:3000/solicitacao/encomenda/' + response.data[0].encomenda)
            }
            axios.post('https://10.9.10.37:3000/solicitacao/',
                {
                    "nova_quantidade": this.state.quantidade,
                    "nova_data_conclusao": this.state.data_conclusao,
                    "data_solicitacao": this.state.data_solicitacao,
                    "encomenda": this.state.id,
                    "cliente": this.state.cliente,
                    "produto": this.state.produto
                },
                {
                    headers: { "cliente": localStorage.getItem('cli_id') }
                }).then((response) => {

                    window.alert("Solicitacao enviada com sucesso!")

                    console.log(response);
                }, (error) => {
                    console.log(error);
                    window.alert("Sem sucesso!")
                })
        })
    };
    handleClick3 = (e) => {
        e.preventDefault();
        axios.post('https://10.9.10.37:3000/solicitacao/',
            {
                "encomenda": this.state.id,
                "cliente": this.state.cliente,
                "cancelar_encomenda": true,
                "produto": this.state.produto
            },
            {
                headers: { "cliente": localStorage.getItem('cli_id') }
            }).then((response) => {

                window.alert("Solicitacao de cancelamento enviada com sucesso!")

                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })
    };

    handleClick2 = () => {
        this.props.history.push("/encomendas");
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
                <h5 className="grey-text text-darken-3 center">Solicitar alteracao de encomenda</h5>

                <select className="browser-default" onChange={this.changeSelect}>
                    <option value="none" key="" hidden> Selecione uma opção</option>
                    {this.state.encomendas.map((e) => <option key={e._id} value={e._id}>{e.produto[0].nome}</option>)}
                </select>

                <div className="input-field">
                    <input id="quantidade" type="number" value={this.state.quantidade} placeholder="Quantidade" className="materialize-textarea" onChange={this.handleChange}></input >
                </div>
                <div className="input-field">
                    <input type="date" id="data_conclusao" data-date-format="YYYY MMMM DD" value={this.state.data_conclusao} placeholder="Data de conclusão" className="materialize-textarea" onChange={this.handleChange}></input >
                </div>

                <br />

                <br />
                <div className="input-group ">
                    <span className="input-group-btn">
                        <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick}>Solicitar alteracao</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick3}>Cancelar encomenda</button>
                        <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick2}>Voltar</button>
                    </span>
                </div>
            </div>
        )
    }

    async componentWillMount() {
        var cli_id = localStorage.getItem('cli_id');
        var enc = [];
        var pro = [];
        await axios.get('https://10.9.10.37:3000/encomendas/encomenda/' + cli_id).then((response) => {
            const data = response.data.filter(el => el.estado === "Ativa");
            data.map((e) => enc.push(e));
        })
        await axios.get('https://mdp37.azurewebsites.net/api/GetAllProdutos').then(res => {
            res.data.map((e) => pro.push(e));
            for (var i = 0; i < enc.length; i++) {
                var produto_id = enc[i].produto;
                enc[i].produto = pro.filter(p => p.id === produto_id);
            }
            this.setState({ encomendas: JSON.parse(JSON.stringify(enc)) })
        })
        await axios.get('https://10.9.10.37:3000/clientes/' + cli_id).then((response) => {
            console.log(response.data);
            this.setState({ cliente: response.data.nome });
        })
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(SolicitarAlteracao)