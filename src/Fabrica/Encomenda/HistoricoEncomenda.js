import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'
import EncomendaSumario from './EncomendaSumario';

class HistoricoEncomenda extends Component {
    state = {
        encomendas: [],
        data: false
    };

    handleClick = () => {
        this.props.history.push("/encomendas");
    };

    render() {
        if (this.state.data !== true) {
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
        return (
            <div>
                <div>
                    {this.state.encomendas.map((enc) => (
                        <EncomendaSumario encomenda={enc} />
                    ))}
                </div>
                <br />
                <div className="input-group center">
                    <span className="input-group-btn">
                        <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Voltar</button> &nbsp;&nbsp;&nbsp;
                    </span>
                </div>
            </div>
        )
    }

    async componentWillMount() {
        var enc = [];
        var pro = [];
        var cli = [];
        await axios.get('https://10.9.10.37:3000/encomendas/').then((response) => {
            const data = response.data.filter(el => (el.estado === "Ativa" || el.estado === "Inativa"));
            data.map((e) => enc.push(e));

        })
        console.log(enc)
        await axios.get('https://mdp37.azurewebsites.net/api/GetAllProdutos').then(res => {
            res.data.map((p) => pro.push(p));

            for (var i = 0; i < enc.length; i++) {
                var produto_id = enc[i].produto;
                enc[i].produto = pro.filter(p => p.id === produto_id);
            }
        })
        await axios.get('https://10.9.10.37:3000/clientes/').then(resCli => {
            resCli.data.map((c) => cli.push(c));

            for (var i = 0; i < enc.length; i++) {
                var cliente_id = enc[i].cliente;
                enc[i].cliente = cli.filter(c => c._id === cliente_id);
            }
            this.setState({ encomendas: JSON.parse(JSON.stringify(enc)), data: true })
        });
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(HistoricoEncomenda)