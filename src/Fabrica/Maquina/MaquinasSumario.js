import React from 'react'

const MaquinasSumario = ({ maquina }) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <item><b>Nome:</b> {maquina.nome} <br />
          <item><b>Marca:</b> {maquina.marca} <br />
            <item><b>Modelo</b> {maquina.modelo} <br />
              <item><b>Tipo:</b> {maquina.tipo.tipo} <br />
                <item><b>Localização:</b> {maquina.localizacao} <br />
                  <item><b>Ativa:</b> {maquina.ativa.toString()} <br />
                  </item> </item> </item> </item> </item> </item>
      </div>
    </div>
  )
}

export default MaquinasSumario