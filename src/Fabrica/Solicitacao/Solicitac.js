import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class AlterarEncomenda extends Component {
    state = {
        solicitacoes: [],
        solicitacao: '',

        encomendas: [],
        id: '',
        produto: '',
        quantidade: '',
        data_conclusao: '',

        nova_quantidade: '',
        nova_data_conclusao: '',
        data_solicitacao: '',
        cancelar_encomenda: '',

        clientes: [],
        cliente: '',
        clienteid: ''
    };

    changeSelect = async (e) => {

        const data = this.state.encomendas.filter(el => el._id === e.target.value);
        this.setState({ id: data[0]._id });
        this.setState({ produto: data[0].produto[0] });
        this.setState({ quantidade: data[0].quantidade });
        this.setState({ estado: data[0].estado });
        var dateConc = data[0].data_conclusao.split('T')[0];
        this.setState({ data_conclusao: dateConc });

        // for (var i = 0; i < sol.length; i++) {
        //     if(sol[i].encomenda== this.state.id){
        //         this.setState({nova_quantidade: sol[i].nova_quantidade});
        //         var dateConc1 = sol[i].nova_data_conclusao.split('T')[0];
        //         this.setState({nova_data_conclusao: dateConc1});
        //         var dateConc2 = sol[i].data_solicitacao.split('T')[0];
        //         this.setState({data_solicitacao: dateConc2});
        //         this.setState({cancelar_encomenda: sol[i].cancelar_encomenda});
        //         this.setState({solicitacao: sol[i]._id});
        //     }
        // }
    };

    changeSelect2 = async (e) => {
        const data = this.state.clientes.filter(el => el._id === e.target.value);
        this.setState({ clienteid: data[0]._id });
        this.setState({cliente: data[0].nome});

        var cli_id = data[0]._id;
        var enc = [];
        var pro = [];
        await axios.get('https://10.9.10.37:3000/encomendas/encomenda/' + cli_id).then((response) => {
            response.data.map((e) => enc.push(e));
            axios.get('https://mdp37.azurewebsites.net/api/GetAllProdutos').then(res => {
                res.data.map((e) => pro.push(e));

                for (var i = 0; i < enc.length; i++) {
                    var produto_id = enc[i].produto;
                    enc[i].produto = pro.filter(p => p.id === produto_id);
                }
                this.setState({ encomendas: JSON.parse(JSON.stringify(enc)) })
            })

        })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    };

    changeEstado = async (e) => {
        this.setState({ estado: e.target.value });
    };

    handleClick = (e) => {
        e.preventDefault();
        axios.put('https://10.9.10.37:3000/encomendas/' + this.state.id,
            {
                "quantidade": this.state.quantidade,
                "data_conclusao": this.state.data_conclusao
            },
            {
                headers: { "cliente": localStorage.getItem('cli_id') }
            }).then((response) => {

                window.alert("Encomenda Alterada com sucesso!")

                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })
            axios.delete('https://10.9.10.37:3000/solicitacao/'+this.state.solicitacao)
    };
    handleClick3 = (e) => {
        e.preventDefault();
        axios.delete('https://10.9.10.37:3000/solicitacao/'+this.state.solicitacao,
            {   
            },
            {
                headers: { "cliente": localStorage.getItem('cli_id') }
            }).then((response) => {
                window.alert("Solicitacao cancelada com sucesso!")
                console.log(response);
            }, (error) => {
                console.log(error);
                window.alert("Sem sucesso!")
            })
    };

    handleClick2 = () => {
        this.props.history.push("/encomendas");
    }


    render() {
        if (localStorage.getItem('logged') != 'true') return (
            <HashRouter>
                <div>
                    <Redirect to='/signin' />
                </div>
            </HashRouter>
        );
        return (

            <div className="card z-depth-0 project-summary">
                <h5 className="grey-text text-darken-3 center">Solicitacoes</h5>

                Cliente
                <select className="browser-default" onChange={this.changeSelect2}>
                    <option></option>
                    {this.state.clientes.map((e) => <option key={e._id} value={e._id}>{e.nome}</option>)}
                </select>
                
                Produto
                <select className="browser-default" onChange={this.changeSelect}>
                    <option></option>
                    {this.state.encomendas.map((e) => <option key={e._id} value={e._id}>{e.produto[0].nome}</option>)}
                </select>
                {this.state.solicitacoes[0].id}

                <div className="input-field">
                    <input id="quantidade" type="number" value={this.state.nova_quantidade} placeholder="Quantidade" className="materialize-textarea" onChange={this.handleChange}></input >
                </div>
                <div className="input-field">
                    <input type="date" id="data_conclusao" data-date-format="YYYY MMMM DD" value={this.state.nova_data_conclusao} placeholder="Data de conclusão" className="materialize-textarea" onChange={this.handleChange}></input >
                </div>

                {/* <select className="browser-default" value={this.state.estado} onChange={this.changeEstado}>
                    <option key="Ativa" value="Ativa">Ativa</option>
                    <option key="Inativa" value="Inativa">Inativa</option>
                </select> */}

                <br />

                <br />
                <div className="input-group ">
                    <span className="input-group-btn">
                        <button className="btn pink lighten-1 z-depth-0" onClick={this.handleClick}>Validar solicitacao</button> &nbsp;&nbsp;&nbsp;
                        <button className="btn pink lighten-1 z-depth-0" onClick={this.handleClick3}>Cancelar solicitacao</button>
                        <button className="btn pink lighten-1 z-depth-0 right" onClick={this.handleClick2}>Voltar</button>
                    </span>
                </div>
            </div>
        )
    }

    async componentWillMount() {
        var cli = [];
        var clientes =[];
        await axios.get('https://10.9.10.37:3000/clientes/').then(resCli => {
            resCli.data.map((c) => cli.push(c));
        });
        for (var i = 0; i < cli.length; i++) {
            if(cli[i].isAdmin==false){
                clientes.push(cli[i])
            }
        }
        this.setState({ clientes: JSON.parse(JSON.stringify(clientes))})

        var sol = [];
        axios.get('https://10.9.10.37:3000/solicitacao/').then(response => {
            response.data.map((c) => sol.push(c));
        });
        this.setState({ solicitacoes: JSON.parse(JSON.stringify(sol)) })


    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(AlterarEncomenda)