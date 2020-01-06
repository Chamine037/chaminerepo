import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import ProdutoSumario from './ProdutoSumario'

class ListarProduto extends Component {
    state = {
        data: false,
        pFabrico: [],
        produtos: []
    }

    handleClick = () => {
        this.props.history.push("/criarproduto");
    }

    handleClick1 = () => {
        this.props.history.push("/produtomenu");
    }


    render() {
        if (this.state.data !== true) {
            return (
                <div>
                    A Carregar lista de Produtos...
                </div>
            )
        }
        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        ); return (
            <div className="container">
                <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <h2 className="grey-text text-darken-3 center">Lista de Produtos</h2>
                    </div>
                </div>
                <div>
                    {this.state.produtos.map((p) =>
                        <ProdutoSumario produto={p} />)}
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Criar Produto</button>
                    <div className="right" >
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Voltar</button>
                    </div>
                </div>
            </div>
        )
    }

    async componentWillMount() {
        axios.get('https://mdp37.azurewebsites.net/api/GetAllProdutos').then(response => this.setState({ produtos: response.data }))
        this.setState({ data: true })
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ListarProduto)