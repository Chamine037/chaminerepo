import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../store/actions/login/authActions'

const links = (props) => {
    if (localStorage.getItem('isAdmin') == 'true') {
        return (
            <ul id="links" className="right">
                <li><NavLink to='/operacaomenu'>Operacões</NavLink></li>
                <li><NavLink to='/tipomaquinamenu'>Tipo de Máquina</NavLink></li>
                <li><NavLink to='/linhaproducao'>Linha de Produção</NavLink></li>
                <li><NavLink to='/maquinamenu'>Máquina</NavLink></li>
                <li><NavLink to='/produtomenu'>Produto</NavLink></li>
                <li><NavLink to='/planofabricomenu'>Plano de Fabrico</NavLink></li>
                <li><NavLink to='/areacliente'>Área do Cliente</NavLink></li>
                <li><NavLink to='/encomendas'>Encomendas</NavLink></li>
                <li><NavLink to='/sgrai'>Fabrica Sgrai</NavLink></li>
                <li><a onClick={props.signOut}>Logout</a></li>
                <img className="border rounded-circle login-one"id="icon-chamine" src="./img/icon.jpg"/>
            </ul>
        )
    }
    return (
        <ul className="right">
            <li><NavLink to='/areacliente'>Área do Cliente</NavLink></li>
            <li><NavLink to='/encomendas'>Encomendas</NavLink></li>
            <li><a onClick={props.signOut}>Logout</a></li>
            <img className="border rounded-circle login-one"id="icon-chamine" src="./img/icon.jpg"/>
        </ul>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(links)