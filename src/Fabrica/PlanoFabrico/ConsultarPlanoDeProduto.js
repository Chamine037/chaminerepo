import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import PlanoFabricoSumario from './PlanoFabricoSumario'

class ConsultarPlanoDeProduto extends Component {
    state = {
        produtos: [],
        planoproduto: [],
        planofabrico: '',
        data: false
    }

    async componentWillMount() {
        await axios.get('https://mdp37.azurewebsites.net/api/GetAllProdutos').then(response => {
            this.setState({ produtos: response.data })
            this.setState({ planofabrico: response.data[0].pFabrico })
            this.setState({ data: true })
        })
    }

    changeSelect = (e) => {
        const data = this.state.produtos.filter(el => el.id === e.target.value);
        //console.log(data[0])
        this.setState({ planofabrico: data[0].pFabrico });
    }

    handleClick = () => {
        this.props.history.push("/planofabricomenu");
    }

    render() {
        if (this.state.data !== true) {
            return <div />
        }
        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        ); return (
            <div className="card z-depth-0 project-summary">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3 center">Consultar Plano de Fabrico de um Produto</h5>
                    <div>
                        <select className="browser-default" onChange={this.changeSelect}>
                            <option value="none" key="" hidden> Selecione uma opção</option>
                            {this.state.produtos.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
                        </select>

                    </div>

                    <div className="mostrarplanodoproduto-group" >
                        <PlanoFabricoSumario pf={this.state.planofabrico} />
                    </div>

                    <div className="input-group center">
                        <span className="input-group-btn">
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Voltar</button> &nbsp;&nbsp;&nbsp;
                    </span>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ConsultarPlanoDeProduto)