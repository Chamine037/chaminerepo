import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import EncomendaSumario from './EncomendaSumario';


class ConsultarEncomendaCliente extends Component {

    state = {
        encomendas: [],
        id: '',
        produto: '',
        quantidade: '',
        data_conclusao: ''
    };

    changeSelect = async (e) => {
        const data = this.state.encomendas.filter(el => el._id === e.target.value);
        this.setState({ id: data[0]._id });
        this.setState({ produto: data[0].produto[0] });
        this.setState({ quantidade: data[0].quantidade });
        this.setState({ data_conclusao: data[0].data_conclusao });
    };


    handleClick = (e) => {
        this.props.history.push("/solicitaralteracao");
    };

    handleClick2 = () => {
        this.props.history.push("/encomendas");
    }


    render() {
        const { auth } = this.props;
        if (localStorage.getItem('logged') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        );
        return (

            <div className="card z-depth-0 project-summary">
                <h5 className="grey-text text-darken-3 center">Consultar encomendas</h5>
                <ul>Selecione o produto:</ul>
                <select className="browser-default" onChange={this.changeSelect}>
                    <option value="none" key="" hidden> Selecione uma opção</option>
                    {this.state.encomendas.map((e) => <option key={e._id} value={e._id}>{e.produto[0].nome}</option>)}
                </select>
                <br />
                <div>
                    <label> <h6>

                        <b>Produto: </b> {this.state.produto.nome}<br />
                        <b>Quantidade: </b> {this.state.quantidade}<br />
                        <b>Data de Conclusão: </b> {this.state.data_conclusao}<br />

                    </h6></label>
                </div>

                <br />
                <div className="input-group center">
                    <span className="input-group-btn">
                    <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick2}>Voltar</button> &nbsp;&nbsp;&nbsp;
                    <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick}>Solicitar alteracao</button>
                    </span>
                </div>
            </div>
        )
    }

    async componentWillMount() {
        var cli_id = localStorage.getItem('cli_id');

        var enc = [];
        var pro = [];
        axios.get('https://10.9.10.37:3000/encomendas/encomenda/' + cli_id).then((response) => {
            const data = response.data.filter(el => el.estado === "Ativa");
            data.map((e) => enc.push(e));
            axios.get('https://mdp37.azurewebsites.net/api/GetAllProdutos').then(res => {
                res.data.map((e) => pro.push(e));

                for (var i = 0; i < enc.length; i++) {
                    var produto_id = enc[i].produto;
                    enc[i].produto = pro.filter(p => p.id === produto_id);
                }
                this.setState({ encomendas: JSON.parse(JSON.stringify(enc)) })
            })
        })



    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ConsultarEncomendaCliente)