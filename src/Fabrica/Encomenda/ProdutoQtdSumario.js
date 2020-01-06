import React from 'react'

const ProdutoQtdSumario = ({ produto }) => {
    if (localStorage.getItem('isAdmin') != "true") {
        return (
            <div className="card z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <item><b>Nome:</b> {produto.produto[0].nome} <br />
                        <item><b>Quantidade:</b> {produto.quantidade} <br />
                        </item> </item>
                </div >
            </div >
        )
    }
}

export default ProdutoQtdSumario

