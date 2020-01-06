import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import ProdutoQtdSumario from './ProdutoQtdSumario'

class ListarProdutosMaisVezesEncomendados extends Component {
    state = {
        nome: '',
        quantidade: '',
        produtos: [],
        produtosOrdenados: [],
        data: false

    }
    changeSelect = (e) => {
        const data = this.state.produtosOrdenados.filter(el => el.id === e.target.value);
        this.setState({ nome: data[0].nome });
        this.setState({ quantidade: data[0].quantidade });
    }

    handleClick2 = () => {
        this.props.history.push("/criarencomendas");
    };

    render() {
        if (localStorage.getItem('logged') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        );
        return (

            <div className="container">
                <br />

                <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <h2 className="grey-text text-darken-3 center">Lista de produtos com maior quantidade de encomendas realizadas</h2>
                    </div>
                </div>
                <div className="center">
                    <button className="btn pink lighten-1 z-depth-0" onClick={this.handleClick2}>Criar Encomenda</button>
                </div>
                <div className="mostrarclientes-group">
                    <label> <h6>
                        {this.state.produtosOrdenados.slice(0, 4).map((p) => (
                            <ProdutoQtdSumario produto={p} />))}
                    </h6>
                    </label>
                </div>
            </div>

        )
    }

    async componentWillMount() {
        var enc = [];
        var pro = [];
        var produtosO = [];
        await axios.get('https://10.9.10.37:3000/encomendas/produto').then(response => {
            const data = response.data.filter(el => el.estado === "Ativa" || "Inativa");
            data.map((e) => enc.push(e));

        })
        await axios.get('https://mdp37.azurewebsites.net/api/GetAllProdutos').then(res => {
            res.data.map((p) => pro.push(p))
            for (var i = 0; i < enc.length; i++) {
                var produto_id = enc[i].produto;
                enc[i].produto = pro.filter(p => p.id === produto_id);
            }
            this.setState({ produtos: JSON.parse(JSON.stringify(enc)), data: true })
        })
        console.log(this.state.produtos);
        for (var i = 0; i < this.state.produtos.length; i++) {
            var k = this.state.produtos[i];
            k.quantidade = 1;
            for (var j = 0; j < this.state.produtos.length; j++) {
                if (this.state.produtos[j].produto[0].nome == k.produto[0].nome && this.state.produtos[j]._id != k._id) {
                    k.quantidade++;
                }
            }
            var b = true;
            console.log(k)
            for (var l = 0; l < produtosO.length; l++) {
                if (produtosO[l].produto[0].nome == k.produto[0].nome) {
                    b = false;
                }
            }

            if (b) {
                produtosO.push(k);
            }
        }
        produtosO.sort(function (a, b) {
            return parseInt(b.quantidade) - parseInt(a.quantidade);
        })
        this.setState({ produtosOrdenados: produtosO })

    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ListarProdutosMaisVezesEncomendados)