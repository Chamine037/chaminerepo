import React, { Component } from 'react'
import OperacoesSumario from './OperacoesSumario'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class ListarOperacoes extends Component {
  state = {
    nome: '',
    operacoes: []
  }

  handleClick = () => {
    this.props.history.push("/criaroperacao");
  }

  handleClick1 = () => {
    this.props.history.push("/operacaomenu");
  }

  render() {
    if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
      <HashRouter>
        <div>
          <Redirect to='/signin' />
        </div>
      </HashRouter>
    )
    return (
      <div className="container">
        <br />
        <div className="input-group">
          <span className="input-group-btn">
            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Criar Operação</button>
            <div className="right" >
              <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Voltar</button>
            </div>
          </span>
        </div>
        {this.state.operacoes.map(op =>
          <OperacoesSumario operacao={op} />
        )}
      </div>
    )
  }

  async componentWillMount() {
    await axios.get('https://mdf37.azurewebsites.net/api/GetAlloperacoes').then(response => this.setState({ operacoes: response.data }))
  }
}

const mapStateToProps = (state) => {
  //state.operacao.operacoes.map((nome) => { console.log(nome.nome, nome.id)})
  /*for( var x in state.operacao.operacoes){
    console.log(x, state.operacao.operacoes[x])
  }*/
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(ListarOperacoes)