import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class AlterarEncomenda extends Component {
    state = {
        encomendas: [],
        id: '',
        produto: '',
        quantidade: '',
        estado: '',
        data_conclusao: ''
    };

    changeSelect = async (e) => {
        const data = this.state.encomendas.filter(el => el._id === e.target.value);
        this.setState({ id: data[0]._id });
        this.setState({ produto: data[0].produto[0] });
        this.setState({ quantidade: data[0].quantidade });
        this.setState({ estado: data[0].estado });
        var dateConc = data[0].data_conclusao.split('T')[0];
        this.setState({ data_conclusao: dateConc });
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
        axios.put('https://10.9.10.37:3000/encomendas/' + this.state.id,
            {
                "quantidade": this.state.quantidade,
                "data_conclusao": this.state.data_conclusao,
                "estado": this.state.estado
            },
            {
                headers: { "cliente": localStorage.getItem('cli_id') }
            }).then((response) => {

                window.alert("Encomenda Alterada com sucesso!")

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
                <h5 className="grey-text text-darken-3 center">Alterar encomenda</h5>
                <label htmlFor="xx">Escolha o produto</label>
                <select className="browser-default" onChange={this.changeSelect}>
                    <option value="none" key="" hidden> Selecione uma opção</option>
                    {this.state.encomendas.map((e) => <option key={e._id} value={e._id}>{e.produto[0].nome}</option>)}
                </select>

                <div className="input-field">
                    <label htmlFor="quantidade">Quantidade</label>
                    <input id="quantidade" type="number" className="materialize-textarea" onChange={this.handleChange}></input >
                </div>
                <div className="input-field">
                    <label htmlFor="data_conclusao">Data de Conclusão</label>
                    <input type="date" id="data_conclusao" data-date-format="YYYY MMMM DD" placeholder="Data de conclusão" className="materialize-textarea" onChange={this.handleChange}></input >
                </div>

                <label htmlFor="x">Estado</label>
                <select className="browser-default" value={this.state.estado} onChange={this.changeEstado}>
                    <option key="Ativa" value="Ativa">Ativa</option>
                    <option key="Inativa" value="Inativa">Inativa</option>
                </select>

                <br />

                <br />
                <div className="input-group center">
                    <span className="input-group-btn">
                        <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick}>Alterar</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick2}>Voltar</button> 

                    </span>
                </div>
            </div>
        )
    }

    async componentWillMount() {
        var enc = [];
        var pro = [];
        axios.get('https://10.9.10.37:3000/encomendas/').then((response) => {
            response.data.map((e) => enc.push(e));
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

export default connect(mapStateToProps)(AlterarEncomenda)