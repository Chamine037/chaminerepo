import React, { Component } from 'react'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import LinhaProducaoSumario from './LinhaProducaoSumario'

class ListarLinhasProducao extends Component {

    state = {
        linhasproducao: []
    }

    handleClick = () => {
        this.props.history.push("/linhaproducao");
    }

    async componentWillMount() {
        await axios.get('https://mdf37.azurewebsites.net/api/GetAllLinhasProducao').then(response => this.setState({ linhasproducao: response.data }))
    }

    render() {
        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        ); return (
            <div>
                {this.state.linhasproducao.map(lp =>
                    <LinhaProducaoSumario lp={lp} />
                )}
                <div className="right" >
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Voltar</button>
                </div>
            </div>
        )
    }
}


export default ListarLinhasProducao