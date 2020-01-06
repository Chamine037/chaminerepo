import React from 'react'

const TipoMaquinasSumario = ({ tipomaquina }) => {
  return (
    <div className="card z-depth-0 tipomaquina-summary ">
      <div className="card-content grey-text text-darken-3 ">
        <item><b>Tipo:</b> {tipomaquina.tipo} <br />
          <item><b>Operações:</b> {tipomaquina.tipoMaquinaOperacao.map((op) => (<item> <p> - {op.operacao.nome} </p></item>))} <br />
          </item> </item>
      </div>
    </div>
  )
}

export default TipoMaquinasSumario