import React, { Component } from 'react'
import { connect } from 'react-redux'
import ClienteSumarioAdmin from './ClienteSumarioAdmin'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'


class ConsultarCliente extends Component {
    state = {
        nome: '',
        email: '',
        morada: '',
        nif: '',
        clientes: []
    }

    changeSelect = (e) => {
        const data = this.state.clientes.filter(el => el.nome === e.target.value);
        this.setState({ nome: data[0].nome });
        this.setState({ email: data[0].email });
        this.setState({ morada: data[0].morada });
        this.setState({ nif: data[0].nif });
    }

    handleClick = (e) => {
        console.log(this.state);
        e.preventDefault();
        axios.get('https://10.9.10.37:3000/clientes/').then(response => this.state({ clientes: response.date }));
    }

    handleClick1 = () => {
        this.props.history.push("/areacliente");
    }

    render() {
        if (localStorage.getItem('logged') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        );
        if (localStorage.getItem('isAdmin') === "true") {
            return (

                <div className="container">
                    <br />

                    <div className="card z-depth-0 project-summary">
                        <div className="card-content grey-text text-darken-3">
                            <h2 className="grey-text text-darken-3 center">Dados dos Clientes Registados</h2>
                        </div>
                    </div>
                    <div className="mostrarclientes-group">
                        <label> <h6>
                            {this.state.clientes.map((c) => (
                                <ClienteSumarioAdmin cliente={c} />))}
                        </h6>
                        </label>
                    </div>
                    <div className="right">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick1}>Voltar</button>
                    </div>
                </div>
            )

        } else {

            return (

                <div className="card z-depth-0 project-summary">
                    <h5 className="grey-text text-darken-3 center">Área de consulta reservada a colaboradores</h5>
                </div>
            )

        }
    }

    async componentWillMount() {
        axios.get('https://10.9.10.37:3000/clientes/').then(response => this.setState({ clientes: response.data }))
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ConsultarCliente)