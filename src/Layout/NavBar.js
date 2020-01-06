import React from 'react'
import { Link } from 'react-router-dom'
import Links from './Links'
import Login from './Login'
import { connect } from 'react-redux'

const Navbar = (props) => {
    const { auth } = props;
    //console.log(auth)
    const links = localStorage.getItem('logged') == 'true' ? <Links /> : <Login />;
    return (
        <nav className="nav" id="nav" style={{display:'block', width:'100%'}}>
            <div className="nav-wrapper" style={{background:'#a05b29'}}>
                <Link to={process.env.PUBLIC_URL + '/'} className='brand-logo'>Fábrica</Link>
                {links}
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Navbar)