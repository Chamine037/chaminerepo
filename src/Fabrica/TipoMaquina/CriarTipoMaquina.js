import React, { Component } from 'react'
import { connect } from 'react-redux'
import { criarTipoMaquina } from '../../store/actions/tipoMaquina/TipoMaquinaActions'
import { HashRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

class CriarTipoMaquina extends Component {
    state = {
        id: 'a',
        tipo: '',
        operacao: '',
        operacoes: [],
        selected_operacoes: []
    }
    handleClick = () => {
        this.props.history.push("/tipomaquinamenu");
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
        axios.post('https://mdf37.azurewebsites.net/api/tipomaquina',
            {
                "tipo": this.state.tipo,
                "operacoes": this.state.selected_operacoes,
            }).then((response) => {
                window.alert("Tipo de máquina criado com sucesso!")
                document.getElementById("abanador").reset();
                this.setState({
                    nome: ''
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
                    <h5 className="grey-text text-darken-3">Criar novo tipo de maquina</h5>
                    <div className="input-field">
                        <label htmlFor="tipo">Nome do tipo de máquina</label>
                        <input type="text" id="tipo" required="true" onChange={this.handleChange} />
                    </div>
                    <div>
                        <h6 className="grey-text text-darken-3" > Selecione as operações que fazem parte deste tipo de máquina</h6>
                        <select multiple={true} className="browser-default" value={this.state.selected_operacoes}
                            onChange={this.changeSelect} style={{ height: "150px" }}>
                            {this.state.operacoes.map((op) => <option key={op.id} value={op.id}>{op.nome}</option>)}
                        </select>
                    </div>
                    <div className="">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}}>Criar</button>
                        <div className="right" >
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Voltar</button>
                        </div>
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
        criarTipoMaquina: (TipoMaquina) => dispatch(criarTipoMaquina(TipoMaquina))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CriarTipoMaquina)
