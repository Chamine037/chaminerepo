import React from 'react'

const EncomendaSumario = ({ encomenda }) => {
    var cli_id = localStorage.getItem('cli_id')
    if (localStorage.getItem('isAdmin') === "true" || encomenda.cliente[0]._id == cli_id) {
        if (encomenda.cliente[0] != null) {
            return (
                <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <h6>Nome do cliente: {encomenda.cliente[0].nome}</h6>
                        <span>Produto : {encomenda.produto[0].nome}<br /></span>
                        <span>Quantidade : {encomenda.quantidade}<br /></span>
                        <span>Estado : {encomenda.estado}<br /></span>
                        <span>Data Limite : {encomenda.data_conclusao}<br /></span>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="card z-depth-0 project-summary">
                    <div className="card-content grey-text text-darken-3">
                        <h6>Nome do cliente: UTILIZADOR APAGADO</h6>
                        <span>Produto : {encomenda.produto[0].nome}<br /></span>
                        <span>Quantidade : {encomenda.quantidade}<br /></span>
                        <span>Estado : {encomenda.estado}<br /></span>
                        <span>Data Limite : {encomenda.data_conclusao}<br /></span>
                    </div>
                </div>
            )
        }
    }
    return null
}
export default EncomendaSumario