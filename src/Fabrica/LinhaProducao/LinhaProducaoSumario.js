import React from 'react'
import MaquinasSumario from '../Maquina/MaquinasSumario'

const LinhaProducaoSumario = ({ lp }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <item><b>Nome:</b> {lp.nome} <br /> <br />
          <item><b>Lista de Máquinas</b> {lp.listaMaquinas.map(m =>
            <MaquinasSumario maquina={m} />)} <br />
          </item> </item>
      </div>
    </div>
  )
}

export default LinhaProducaoSumario