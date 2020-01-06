import React, { Component } from 'react'
import { criarPlanoFabrico } from '../../store/actions/planoFabrico/PlanoFabricoActions'
import { connect } from 'react-redux'
import { HashRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

class CriarPlanoFabrico extends Component {
    state = {
        nome: '',
        selected_operacoes: [],
        operacoes: []
    }

    handleClick = () => {
        this.props.history.push("/planofabricomenu");
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    changeSelect = (e) => {

        if (!this.state.selected_operacoes.includes(e.target.value)) {
            this.state.selected_operacoes.push(e.target.value);
        } else {
            var data = this.state.selected_operacoes.filter(el => el !== e.target.value);
            this.setState({ selected_operacoes: data })

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios.post('https://mdp37.azurewebsites.net/api/planofabrico',
            {
                "nome": this.state.nome,
                "operacoes": this.state.selected_operacoes,
            }).then((response) => {

                window.alert("Plano de fabrico criado com sucesso!")
                document.getElementById("abanador").reset();
                this.setState({
                    operacoes: []
                })
                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })
    }

    async componentWillMount() {
        axios.get('https://mdf37.azurewebsites.net/api/getalloperacoes').then(response => this.setState({ operacoes: response.data }))
    }

    render() {
        const { auth } = this.props;
        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        ); return (
            <div className="container">
                <form id="abanador" onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3 center">Criar novo Plano de fabrico</h5>
                    <br />
                    <div className="input-field">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" required="true" onChange={this.handleChange} />
                    </div>
                    <div>
                        <h6 className="grey-text text-darken-3" > Selecione as operações que fazem parte deste plano de fabrico</h6>

                        <select multiple={true} className="browser-default" value={this.state.selected_operacoes}
                            onChange={this.changeSelect} style={{ height: "150px" }}>
                            {this.state.operacoes.map((op) => <option key={op.id} value={op.id}>{op.nome}</option>)}
                        </select>

                    </div>
                    <div className="input-group center">
                        <span className="input-group-btn">
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}}>Criar</button>  &nbsp;&nbsp;&nbsp;
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Voltar</button>
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("pipipi", state)
    return {
        auth: state.auth
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        criarPlanoFabrico: (planoFabrico) => dispatch(criarPlanoFabrico(planoFabrico))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CriarPlanoFabrico)
