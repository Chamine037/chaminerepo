import React from 'react'

const Operacoessumario = ({ operacao }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <item><b>Nome:</b> {operacao.nome} <br />
        </item>
      </div>
    </div>
  )
}

export default Operacoessumario