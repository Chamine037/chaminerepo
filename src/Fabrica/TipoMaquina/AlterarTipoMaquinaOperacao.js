import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class AlterarTipoMaquinaOperacao extends Component {
    state = {
        id: '',
        tipo: '',
        operacao: '',
        listaTipoMaquinas: [],
        operacoes: [],
        listaoperacoes: [],
        selected_operacoes: [],
        data: false
    }

    changeSelect = (e) => {
        const data = this.state.listaTipoMaquinas.filter(el => el.id === e.target.value);
        this.setState({ tipoMaquina: data[0] });
        this.setState({ tipo: data[0].tipo });
        this.setState({ operacoes: data[0].operacoes });
    };

    changeSelect2 = (e) => {
        if (!this.state.selected_operacoes.includes(e.target.value)) {
            this.state.selected_operacoes.push(e.target.value);
        } else {
            var data = this.state.selected_operacoes.filter(el => el !== e.target.value);
            this.setState({ selected_operacoes: data })

        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state, [e.target.name]: value
        });
    };

    handleClick = (e) => {
        e.preventDefault();
        axios.put('https://mdf37.azurewebsites.net/api/tipomaquina/UpdateOperacoesMaquina/' + this.state.tipoMaquina.id,
            {
                "tipo": this.state.tipo,
                "operacoes": this.state.selected_operacoes,

            }).then((response) => {
                window.alert("Operações alteradas com sucesso!")
                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
                console.log("ACERERE ", this.state.tipo, this.state.selected_operacoes)
            })
    }


    handleClick1 = () => {
        this.props.history.push("/tipomaquinamenu");
    }

    async componentWillMount() {
        await axios.get('https://mdf37.azurewebsites.net/api/TipoMaquina/GetAllTipoMaquinas').then(response => this.setState({ listaTipoMaquinas: response.data }))
        this.setState({ data: true });
        await axios.get('https://mdf37.azurewebsites.net/api/GetAllOperacoes').then(response => this.setState({ listaoperacoes: response.data }))

    }

    render() {
        const { auth } = this.props;
        //if \(!auth\.isLoaded\) return null
        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        ); return (

            <div className="card z-depth-0 project-summary">
                <h5 className="grey-text text-darken-3 center">Alterar operações de tipo de máquina</h5>
                <div>
                    <div >
                        <label> <h6><b>Tipo:</b> {this.state.tipo} </h6></label>
                        <br />
                    </div>
                    <select className="browser-default" onChange={this.changeSelect}>
                        <option value="none" key="" hidden> Selecione uma opção</option>
                        {this.state.listaTipoMaquinas.map(
                            (tm) =>
                                <option key={tm.id} value={tm.id}>{tm.tipo} </option>)}
                    </select>
                    <br />
                    <div>
                        <h6 className="grey-text text-darken-3" > Selecione as operações que fazem parte deste tipo de máquina</h6>
                        <select multiple={true} className="browser-default" value={this.state.selected_operacoes}
                            onChange={this.changeSelect2} style={{ height: "150px" }}>
                            {this.state.listaoperacoes.map((op) => <option key={op.id} value={op.id}>{op.nome}</option>)}
                        </select>

                    </div>
                </div>
                <div className="input-group">
                    <span className="input-group-btn">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Gravar Alterações</button>
                        <div className="right" >
                            <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Voltar</button>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(AlterarTipoMaquinaOperacao)