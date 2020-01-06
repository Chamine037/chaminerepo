import React, { Component } from 'react'
import { criarProduto } from '../../store/actions/produto/ProdutoActions'
import { connect } from 'react-redux'
import { HashRouter, Redirect } from 'react-router-dom'
import axios from 'axios'

class CriarProduto extends Component {
    state = {
        id: '',
        nome: '',
        pfabrico: '',
        planosfabrico: [],
        tempoproducao: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    handleClick = () => {
        this.props.history.push("/produtomenu");
    }

    changeSelect = (e) => {
        console.log(this.state.pfabrico)
        this.setState({
            pfabrico: e.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.produto == '' || this.state.pfabrico == '' || this.state.tempoproducao == '') {
            window.alert("Todos os campos necessários para criar produto!")
            return;
        }
        axios.post('https://mdp37.azurewebsites.net/api/produto',
            {
                "nome": this.state.nome,
                "pfabrico": this.state.pfabrico,
                "tempoproducao": this.state.tempoproducao
            }).then((response) => {

                window.alert("Produto criado com sucesso!")
                document.getElementById("abanador").reset();
                this.setState({
                    nome: '',
                    pfabrico: '',
                    tempoproducao: ''
                })

                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })
    }
    async componentWillMount() {
        axios.get('https://mdp37.azurewebsites.net/api/GetAllPlanosFabrico').then(response => this.setState({ planosfabrico: JSON.parse(JSON.stringify(response.data)) }))
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
                    <h5 className="grey-text text-darken-3">Criar novo Produto</h5>
                    <div className="input-field">
                        <label htmlFor="nome">Nome do produto</label>
                        <input type="text" id="nome" required="true" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="nome">Tempo de Produção</label>
                        <input type="number" id="tempoproducao" required="true" onChange={(e) => this.setState({ tempoproducao: e.target.value })} />
                    </div>
                    <div>
                        <h6 className="grey-text text-darken-3" > Defina um plano de fabrico para este produto</h6>

                        <select className="browser-default" value={this.state.pfabrico}
                            onChange={(e) => this.setState({ pfabrico: e.target.value }, console.log(this.state.pfabrico))}>
                            <option value="none" key="" hidden> Selecione uma opção</option>
                            {this.state.planosfabrico.map((pf) =>
                                <option key={pf.id} value={pf.id}>{pf.nome}</option>)}
                        </select>

                    </div>

                    <div className="input-field">
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
        criarProduto: (produto) => dispatch(criarProduto(produto))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CriarProduto)
