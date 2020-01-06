import React from 'react'
import { NavLink } from 'react-router-dom'
const login = () => {
    return (
        <ul className="right">
            <li><NavLink to='/signin'>Login</NavLink></li>
            <li><NavLink to='/signup'>Inscrever</NavLink></li>
        </ul>
    )
}

export default login