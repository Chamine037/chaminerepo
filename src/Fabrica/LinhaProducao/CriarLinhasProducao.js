import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HashRouter, Redirect } from 'react-router-dom'
import { criarLinhasProducao } from '../../store/actions/linhaProducao/LinhaProducaoActions'
import axios from 'axios'

class CriarLinhasProducao extends Component {
    state = {
        id: '',
        nome: '',
        listaMaquinas: [],
        maquinas_selecionadas: [],
        axisx: '',
        axisy: ''
    }

    handleChange = (e) => {
        if (!this.state.maquinas_selecionadas.includes(e.target.value)) {
            this.state.maquinas_selecionadas.push(e.target.value)
        } else {
            var data = this.state.maquinas_selecionadas.filter(el => el !== e.target.value);
            this.setState({ maquinas_selecionadas: data })
        }
    }

    handleChange1 = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClick = () => {
        this.props.history.push("/listarlp");
    }

    handleClick1 = () => {
        this.props.history.push("/");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.axisx > 90 || this.state.axisx < 0 || this.state.axisy > 60 || this.state.axisy < 0) {
            window.alert("A localização para a linha de produção encontra-se fora dos limites da fábrica")
            return;
        }
        console.log(parseInt(this.state.axisy) + this.state.maquinas_selecionadas.length * 7)
        if (parseInt(this.state.axisy) + parseInt(this.state.maquinas_selecionadas.length * 7) > 60) {
            var nmaq = (parseInt(this.state.axisy) + parseInt(this.state.maquinas_selecionadas.length * 7) - 60) / 7;
            console.log(nmaq)
            window.alert("A linha de produção é demasiado grande para a localização indicada, remova " + Math.ceil(nmaq) + " máquinas para colocar a linha de produção na localização");
            return;
        }
        axios.post('https://mdf37.azurewebsites.net/api/linhaproducao',
            {
                "nome": this.state.nome,
                "listamaquinas": this.state.maquinas_selecionadas,
                "eixo_x": this.state.axisx - 45,
                "eixo_y": this.state.axisy - 30,
            }).then((response) => {
                window.alert("Linha de produçao criada com sucesso!")
                document.getElementById("abanador").reset();
                this.setState({
                    nome: '',
                    axis: ''
                })
                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso! Já existe uma LP na localização!")
            })
    }

    async componentWillMount() {
        axios.get('https://mdf37.azurewebsites.net/api/GetAllMaquinas').then(response => this.setState({ listaMaquinas: response.data }))
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
                <div class="center-align">
                    <span className="input-group-btn">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Consultar Linhas Producao</button>
                    </span>
                </div>
                <form id="abanador" onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Criar nova linha de produção</h5>
                    <div className="input-field">
                        <label htmlFor="nome">Nome da linha de produção</label>
                        <input type="text" id="nome" required="true" onChange={this.handleChange1} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="nome">Localização na Fábrica em X (0-90)</label>
                        <input type="number" id="axisx" required="true" onChange={this.handleChange1} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="nome">Localização na Fábrica em Y (0-60)</label>
                        <input type="number" id="axisy" required="true" onChange={this.handleChange1} />
                    </div>
                    <div>
                        <h6 className="grey-text text-darken-3" > Selecione as máquinas que fazem parte desta linha de produção</h6>
                        <select multiple={true} className="browser-default" value={this.state.maquinas_selecionadas}
                            onChange={this.handleChange} style={{ height: "150px" }}>
                            {this.state.listaMaquinas.map((m) => <option key={m.id} value={m.id}>{m.nome}</option>)}
                        </select>
                    </div>
                    <div className="input-field">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}}>Criar</button>
                        <div className="right" >
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Voltar</button>
                        </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        criarLinhasProducao: (linhaproducao) => dispatch(criarLinhasProducao(linhaproducao))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CriarLinhasProducao)