import React, { Component } from 'react'
import { HashRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { criarCliente } from '../store/actions/cliente/ClienteActions'
import axios from 'axios'

class SignUp extends Component {
    state = {
        nome: '',
        morada: '',
        nif: '',
        email: '',
        password: '',
        isAdmin: '',
        confirmPassword: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClick = () => {
        this.props.history.push("/signin");
    }

    handleClick1 = () => {
        this.props.history.push("/termos");
    }

    validateNIF = () => {
        if (this.state.nif.length == 9) {
            var added = ((this.state.nif[7] * 2) + (this.state.nif[6] * 3) + (this.state.nif[5] * 4) + (this.state.nif[4] * 5) + (this.state.nif[3] * 6) + (this.state.nif[2] * 7) + (this.state.nif[1] * 8) + (this.state.nif[0] * 9));
            var mod = added % 11;
            var control;
            if (mod == 0 || mod == 1) {
                control = 0;
            } else {
                control = 11 - mod;
            }

            if (this.state.nif[8] == control) {
                return true;
            } else {
                alert("NIF inválido. Tente novamente, por favor.");
                return false;
            }
        } else {
            alert("NIF inválido. Introduza 9 dígitos e tente novamente, por favor");
            return false;
        }
    }

    validatePassword = () => {
        this.state.password = document.getElementById("password").value;
        this.state.confirmPassword = document.getElementById("confirmPassword").value;
        if (this.state.password != this.state.confirmPassword) {
            alert("Passwords não coincidem. Tente novamente, por favor.");
            return false;
        }
        return true;
    }


    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateNIF() == true && this.validatePassword() == true) {
            axios.post('https://10.9.10.37:3000/clientes/signup',
                {
                    "nome": this.state.nome,
                    "morada": this.state.morada,
                    "nif": this.state.nif,
                    "email": this.state.email,
                    "password": this.state.password,
                    "confirmPassword": this.state.confirmPassword,
                    "isAdmin": false
                }).then((response) => {
                    window.alert("Cliente registado com sucesso!")
                    if(document.getElementById("abanador") !== null) {
                        document.getElementById("abanador").reset();
                    }
                    this.setState({
                        nome: '',
                        morada: '',
                        nif: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    });

                    document.getElementById("fundo-registo").reset();
                    console.log(response);
                }, (error) => {
                    console.log(error);
                    window.alert("Sem sucesso!")
                })
        }
    };

    render() {
        const { auth } = this.props;
        if (localStorage.getItem('logged') == 'true') return <Redirect to='/' />
        return (
            <div>
                <div id="fundo" className="register-photo">
                    <div id="form-container" className="form-container">
                        <form id="fundo-registo" method="post">
                            <h2 className="text-center" id="titulo-registo"><strong>Criar </strong>uma conta</h2>
                            <p id="paragrafo-registo">Preencha os seguintes campos para efetuar o seu registo.<br/></p>
                            <div className="form-group">
                                <input className="form-control" type="text" id="nome"
                                                               name="nome" placeholder="Nome" required="true"
                                                               bsStyle="width: 420px;align-items: left;background: #f7f9fc;border: none;border-bottom: 1px solid #dfe7f1;border-radius: 0;box-shadow: none;outline: none;color: inherit;text-indent: 6px;color: #495057;background-color: #fff;" onChange={this.handleChange}/>
                            </div>
                            <div
                                className="form-group">
                                <input className="form-control" type="email" id="email"
                                                              name="email" placeholder="Email" required="true"
                                                              bsStyle="width: 420px;" onChange={this.handleChange}/></div>
                            <div className="form-group">
                                <input className="form-control" type="text" id="morada"
                                                               name="morada" placeholder="Morada" required="true"
                                                               bsStyle="width: 420px;" onChange={this.handleChange}/></div>
                            <div className="form-group">
                                <input className="form-control" type="text" pattern="[0-9]*" id="nif"
                                                               placeholder="NIF" required="true"
                                                               bsStyle="width: 420px;" onChange={this.handleChange}/></div>
                            <div className="form-group">
                                <input className="form-control" type="password"
                                                               id="password" name="password"
                                                               placeholder="Password" required="true"
                                                               bsStyle="width: 420px;" onChange={this.handleChange}/>
                            </div>
                            <input className="form-control" type="password" id="confirmPassword"
                                   name="password-repeat" placeholder="Password (repeat)"
                                   required="true" bsStyle="width: 420px;" onChange={this.handleChange}/>
                                <div className="form-group">
                                    <div className="form-check"><label className="form-check-label"
                                                                       id="paragrafo-concordar-termos"
                                                                       bsStyle="margin-top: 10px;margin-bottom: 10px;">
                                        <input
                                        className="form-check-input" type="checkbox" id="checkbox"/>Ao criar uma conta está a concordar com os termos da <a id="link-politica-privacidade" href="/Chamine037/#/Chamine037/termos">política de privacidade</a>.</label>
                                    </div>
                                </div>
                                <div className="form-group"
                                     bsStyle="width: 400px;align-content: center;position: initial;">
                                    <div bsStyle="align-content: center;">
                                        <button className="btn btn-primary btn-block" id="btn-registo" type="submit"
                                                bsStyle="background-color: rgb(171,90,31);margin-top: 10px;align-content: center;border-radius: 10px;" onClick={this.handleSubmit}>Registar
                                        </button>
                                    </div>
                                </div>
                                <a id="paragrafo-redireciona-login" className="already" href="/Chamine037/#/Chamine037/signin"
                                   bsStyle="color: #505e6c;">Já tem uma conta? <strong><span
                                    bsStyle="text-decoration: underline;">Autenticar</span></strong>.</a></form>
                    </div>
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
}

const mapDispatchToProps = (dispatch) => {
    return {
        criarCliente: (cliente) => dispatch(criarCliente(cliente))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
