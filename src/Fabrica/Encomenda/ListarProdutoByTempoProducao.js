import React, { Component } from 'react'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import ProdutoSumario from '../Produto/ProdutoSumario'

class ListarProdutoByTempoProducao extends Component {
    state = {
        data: false,
        pFabrico: [],
        produtos: []
    }

    handleClick = () => {
        this.props.history.push("/criarencomendas");
    }


    render() {
        if (this.state.data !== true) {
            return (
                <div>
                    A Carregar lista de Produtos...
                </div>
            )
        }
        if (localStorage.getItem('logged') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        ); return (
            <div className="container">
                <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <h2 className="grey-text text-darken-3 center">Lista de Produtos por Tempo de Produção</h2>
                    </div>
                </div>
                <div>
                    {this.state.produtos.map((p) =>
                        <ProdutoSumario produto={p} />)}
                    <div className="center">
                        <button className="btn" style={{ color: '#000000', background: '#9d5d2f' }} onClick={this.handleClick}>Criar Encomenda</button>
                    </div>
                </div>
            </div>
        )
    }

    async componentWillMount() {
        await axios.get('https://mdp37.azurewebsites.net/api/GetAllProdutos').then(response => this.setState({ produtos: response.data }))
        this.setState({ data: true })
        var vag = this.state.produtos.sort(function (a, b) {
            return a.tempoProducao - b.tempoProducao
        });
        this.setState({ produtos: vag });
    }
}

export default ListarProdutoByTempoProducao