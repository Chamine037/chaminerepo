import React from 'react'

const ClienteSumarioAdmin = ({ cliente }) => {
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <item><b>Nome:</b> {cliente.nome} <br />
                </item>
            </div>
        </div>
    )
}

export default ClienteSumarioAdmin