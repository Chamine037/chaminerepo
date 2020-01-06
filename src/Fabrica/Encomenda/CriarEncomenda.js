import React, { Component } from 'react'
import { criarEncomenda } from '../../store/actions/encomenda/EncomendaActions'
import { connect } from 'react-redux'
import { HashRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

class CriarEncomenda extends Component {
    state = {
        quantidade: '',
        produto: '',
        produtos: [],
        data_conclusao: '',
        produto_qtd: [],
        produtosmais: [],
        pmaisencomendados: false,
        data: false
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    };

    handleClick = () => {
        this.props.history.push("/encomendas");
    };

    handleClickTempoProducao = () => {
        this.props.history.push("/listarprodutotempo");
    };

    handleClickMaisVezesEncomendado = () => {
        this.props.history.push("/consultarencomendaprodutomais");
    };

    produtosMaisEncomendados = () => {
        this.setState({ pmaisencomendados: !this.state.pmaisencomendados })
        this.render()
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.produto == '' || this.state.quantidade == '' || this.state.data_conclusao == '') {
            window.alert("Todas os campos são necessários para a criação de uma encomenda")
            return;
        }
        axios.post('https://10.9.10.37:3000/encomendas/encomenda/',
            {
                "quantidade": this.state.quantidade,
                "produto": this.state.produto,
                "data_conclusao": this.state.data_conclusao
            },
            {
                headers: { "cliente": localStorage.getItem('cli_id') }
            }).then((response) => {

                window.alert("Encomenda criada com sucesso!")
                this.setState({
                    nome: '',
                    pfabrico: ''
                })

                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })
    }
    async componentWillMount() {
        axios.get('https://mdp37.azurewebsites.net/api/GetAllProdutos').then(response => this.setState({ produtos: JSON.parse(JSON.stringify(response.data)) }))
        axios.get('https://10.9.10.37:3000/encomendas/nprodutos').then((response) => this.setState({ produto_qtd: response.data, data: true }, this.arroz))
    }

    arroz = () => {
        for (var i = 0; i < 5; i++) {
            if (this.state.produto_qtd[i] != null) {
                this.state.produtosmais[i] = {
                    nomeproduto: this.state.produtos.filter(p => p.id === this.state.produto_qtd[i]._id)[0].nome,
                    nenc: this.state.produto_qtd[i].count
                }
            }
        }
    }

    render() {
        if (this.state.data != true) {
            return (
                <div>
                    LOADING...
                </div>
            )
        }
        if (localStorage.getItem('logged') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        );
        if (this.state.pmaisencomendados === false) {
            return (
                <div className="card z-depth-0 project-summary white">
                    <h5 className="grey-text text-darken-3 center">Criar nova encomenda</h5>
                    <label>
                        <h7 className="grey-text text-darken-3" > Escolha um produto</h7>

                        <select className="browser-default" value={this.state.produto}
                            onChange={(e) => this.setState({ produto: e.target.value })}>
                            <option value="none" key="" hidden> Selecione uma opção</option>
                            {this.state.produtos.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}

                        </select>

                    </label>
                    <div className="input-field">
                        <input id="quantidade" type="number" value={this.state.quantidade} placeholder="Quantidade" className="materialize-textarea" onChange={this.handleChange}></input >
                    </div>
                    <div className="input-field">
                        <input type="date" id="data_conclusao" data-date-format="YYYY MMMM DD" min={moment().format("YYYY-MM-DD")} value={this.state.data_conclusao} placeholder="Data de conclusão" className="materialize-textarea" onChange={this.handleChange}></input >
                    </div>
                    <br />
                    <form onSubmit={this.handleSubmit} className="white">
                        <div className="input-group center">
                            <span className="input-group-btn">
                                <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Voltar</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}}>Criar</button>
                                <br />
                                <br />
                            </span>
                        </div>
                    </form>
                    <div className="center">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.produtosMaisEncomendados}>Mostrar Produtos mais vezes Encomendados</button>
                    </div>
                    <br />
                    <div className="center">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClickTempoProducao}>Consultar Produtos por menor tempo de producao</button>
                    </div>
                    <br />
                    <div className="center">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClickMaisVezesEncomendado}>Consultar Produtos mais encomendados por quantindade</button>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {this.state.produtosmais.map((pm) =>
                    <div className="card z-depth-0 project-summary white">
                        <h6>Nome do Produto : {pm.nomeproduto} , Encomendado : {pm.nenc} vezes</h6>
                    </div>
                )}
                <div className="center">
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.produtosMaisEncomendados}>Voltar à página de encomenda</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("pipipi", state)
    return {
        auth: state.auth
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        criarEncomenda: (encomenda) => dispatch(criarEncomenda(encomenda))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CriarEncomenda)
