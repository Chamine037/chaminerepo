import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {HashRouter, Redirect} from 'react-router-dom'


class AgendasTemporais extends Component {
    state = {
        encomendas: '',
        agendas: ''
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
                        <h2 className="grey-text text-darken-3 center">Agendas</h2>
                    </div>
                </div>

                <div className="mostrarbc-group">
                    <label><h6>
                        encomendas( {this.state.encomendas} ).
                    </h6>
                    </label>
                <p></p><p></p>
                    <label><h6>
                        agendas( {this.state.agendas.toString()} ).
                    </h6>
                    </label>
                </div>

            </div>
        )
    }

    async componentWillMount() {
        await axios.get('http://10.9.10.37:5000/encomendas').then(response => this.setState({encomendas: response.data}));
        await axios.get('http://10.9.10.37:5000/agendas').then(response => this.setState({agendas: response.data}));
    }
}

const mapStateToProps = (state) => {

    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps)(AgendasTemporais)