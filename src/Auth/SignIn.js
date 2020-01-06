import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from "../store/actions/login/authActions"
import { HashRouter, Redirect } from 'react-router-dom'

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        id: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
        console.log(this.state);
    }

    render() {
        const { authError, auth } = this.props;
        ////if \(!auth\.isLoaded\) return null
        if (localStorage.getItem('logged') == 'true') return <Redirect to='/' />
        return (
            <div>
                <div id="fundo" className="login-one" bsStyle="background-color: rgba(171,90,31,0.34);">
                    <form id="login-one-form" className="login-one-form"
                          bsStyle="background-color: rgba(255,255,255,0.55);border-radius: 30px;width: 500px;border: none;height: 430px;align-content: center;align-items: center;align-self: center;margin-top: 50px;">
                        <div className="col" bsStyle="align-content: center;">
                            <div className="login-one-ico" bsStyle="margin-bottom: 0px;height: 110px;"><i
                                className="fa fa-unlock-alt" id="lockico" bsStyle="color: #ab5a1f;font-size: 75px;"></i>
                            </div>
                            <div className="form-group">
                                <div>
                                    <h3 className="text-center" id="heading" bsStyle="color: #505e6c;"><strong>Login</strong></h3>
                                </div>
                                <div bsStyle="margin-left: 0px;width: 250px;margin-top: 10px;align-content: center;">
                                    <input className="form-control" type="email" id="email" placeholder="Email"
                                           required="true" onChange={this.handleChange}/>
                                    <input className="form-control" type="password" id="password"
                                            placeholder="Password" required="true" onChange={this.handleChange}/>
                                    <button
                                        className="btn btn-primary" id="button"
                                        bsStyle="background-color: #ab5a1f;border-radius: 10px;align-content: center;border-radius: 10px;border: none;width: 100%;margin: 0px;padding-top: 9px;height: 38px;margin-top: 10px;"
                                        type="submit" onClick={this.handleSubmit}> Login
                                    </button>
                                </div>
                                <a id="registar-link" className="already" href="/signup"
                                   bsStyle="color: #505e6c;align-items: center;align-content: center;text-align: center;font-size: 15px;text-decoration: none;"><br/>Não
                                    tem uma conta?&nbsp;<strong><span
                                        bsStyle="text-decoration: underline;">Registar</span>.</strong><br/><br/></a>
                            </div>
                        </div>
                    </form>
                </div>
                        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)