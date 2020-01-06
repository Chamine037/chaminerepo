import React from 'react'

const SolicitacaoSumario = ({ solicitacao }) => {
    var cli_id = localStorage.getItem('cli_id')

    return (
        <div className="card z-depth-0 project-summary">
            <div className="card-content grey-text text-darken-3">
                <h6>Encomenda: {solicitacao.encomenda}</h6>
                <span>Nova data de conclusao solicitada : {solicitacao.nova_data_conclusao}<br /></span>
                <span>Quantidade solicitada : {solicitacao.nova_quantidade}<br /></span>
                <span>Data da Solicitacao : {solicitacao.data_solicitacao}<br /></span>
                <span>Cancelar Encomenda : {solicitacao.cancelar_encomenda}<br /></span>
            </div>
        </div>
    )
}
export default SolicitacaoSumario