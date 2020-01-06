import React from 'react'
import PlanoFabricoSumario from '../PlanoFabrico/PlanoFabricoSumario'

const ProdutoSumario = ({ produto }) => {
    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <b>Nome do Produto:</b> {produto.nome}
                <PlanoFabricoSumario pf={produto.pFabrico} />
                <b>Tempo de producao:  {produto.tempoProducao}</b>
            </div >
        </div >
    )
}

export default ProdutoSumario