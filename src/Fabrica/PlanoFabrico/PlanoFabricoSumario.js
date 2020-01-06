import React from 'react'

const PlanoFabricoSumario = ({ pf }) => {
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <item><b>Plano de Fabrico:</b> {pf.nome} <br />
                    <item><b>Operações do Plano de Fabrico:</b><br /> {pf.planoFabricoOperacao.map((op) =>
                        <span className="front-size:50%card-title "> - {op.operacao.nome}
                            <br />
                        </span>
                    )} <br />
                    </item> </item>
            </div >
        </div >
    )
}

export default PlanoFabricoSumario