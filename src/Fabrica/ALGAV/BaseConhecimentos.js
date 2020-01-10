import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {HashRouter, Redirect} from 'react-router-dom'


class BaseConhecimentos extends Component {
    state = {
        linhas: '',
        maquinas: '',
        tipos_maq_linha: '',
        tipo_operacoes: '',
        produtos: '',
        clientes: '',
        encomendas: '',
        operacoes_produto: ''
    };

    render() {
        const {auth} = this.props;
        //if \(!auth\.isLoaded\) return null
        if (localStorage.getItem('logged') != 'true' || localStorage.getItem('isAdmin') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin'/>
                </div>
            </HashRouter>
        );
        return (
            <div className="container">
                <br/>

                <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <h2 className="grey-text text-darken-3 center">Base de conhecimentos</h2>
                    </div>
                </div>

                <div className="mostrarbc-group">
                    <label><h6>
                        linhas( {this.state.linhas} ).
                    </h6>
                    </label>
                    <p></p>
                    <label><h6>
                        maquinas( {this.state.maquinas} ).
                    </h6>
                    </label>
                    <p></p>
                    <label><h6>
                        tipos_maq_linha( {this.state.tipos_maq_linha} ).
                    </h6>
                    </label>
                    <p></p>
                    <label><h6>
                        tipo_operacoes( {this.state.tipo_operacoes} ).
                    </h6>
                    </label>
                    <p></p>
                    <label><h6>
                        produtos( {this.state.produtos}).
                    </h6>
                    </label>
                    <p></p>
                    <label><h6>
                        operacoes_produto( {this.state.operacoes_produto}).
                    </h6>
                    </label>
                </div>

            </div>
        )
    }

    async componentWillMount() {
        await axios.get('https://10.9.10.37:5000/linhas').then(response => this.setState({linhas: response.data}));
        await axios.get('https://10.9.10.37:5000/maquinas').then(response => this.setState({maquinas: response.data}));
        await axios.get('https://10.9.10.37:5000/maq_linha').then(response => this.setState({tipos_maq_linha: response.data}));
        await axios.get('https://10.9.10.37:5000/operacoes').then(response => this.setState({tipo_operacoes: response.data}));
        await axios.get('https://10.9.10.37:5000/produtos').then(response => this.setState({produtos: response.data}));
        await axios.get('https://10.9.10.37:5000/opsproduto').then(response => this.setState({operacoes_produto: response.data}));
}
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps)(BaseConhecimentos)