import React from 'react'

const ClienteSumario = ({ cliente }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <item><b>Nome:</b> {cliente.nome} <br />
          <item><b>E-mail:</b> {cliente.email} <br />
            <item><b>Morada:</b> {cliente.morada} <br />
              <item><b>NIF:</b> {cliente.nif} <br />
              </item> </item> </item> </item>
      </div>
    </div>
  )
}

export default ClienteSumario