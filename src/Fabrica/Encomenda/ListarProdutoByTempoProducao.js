import React, { Component } from 'react'
import { connect } from 'react-redux'
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
                        <button className="btn pink lighten-1 z-depth-0" onClick={this.handleClick}>Criar Encomenda</button>
                    </div>
                </div>
            </div>
        )
    }

    async componentWillMount() {
        await axios.get('https://mdp37.azurewebsites.net/api/GetAllProdutos').then(response => this.setState({ produtos: response.data }))
        this.setState({ data: true })

        // this.state.produtos.sort(function (a, b) {
        //     return parseFloat(a.tempoproducao) - parseFloat(b.tempoproducao);
        // })

        console.log(this.state.produtos);
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ListarProdutoByTempoProducao)