import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { HashRouter, Redirect } from 'react-router-dom'

class TermosPrivacidade extends Component {

    handleClick = () => {
        this.props.history.push("/signup");
    }

    render() {
        const { auth } = this.props;
        return (
            <div className="white lighten-1 z-depth-0">
                <h4 className="grey-text text-darken-3">Termos da politica de privacidade</h4>
                <p>
                    A MyOwnCutlery compromete-se a proteger a sua privacidade e a tornar a sua experiência de compra o mais agradável possível. Esta declaração é aplicável apenas ao site da MyOwnCutlery, regulando a recolha e tratamentos dos dados pessoais dos nossos clientes. Ao aceder e utilizar o website “endereço url do site”, o Utilizador está a consentir a aceitação e respeito pelas condições descritas na presente declaração.</p>

                <h5 className="grey-text text-darken-3">Recolha dos seus dados pessoais</h5>
                <p>Os seus dados são recolhidos por duas razões:</p>
                <p>1º - Processamento da sua encomenda</p>
                <p>2º - Fornecimento de um melhor serviço</p>

                <h5 className="grey-text text-darken-3">Dados pessoais recolhidos pela MyOwnCutlery:</h5>
                <p>1 – Endereço de e-mail;</p>
                <p>2 – Nome;</p>
                <p>3 – Morada: Casa ou trabalho;</p>
                <p>4 – NIF</p>
                <p>6 – Data de Nascimento.</p>

                <p>Por favor note que ao revelar dados pessoais em meios públicos da MyOwnCutlery como: Facebook, esta informação poderá ser vista e utilizada por terceiros.</p>

                <h5 className="grey-text text-darken-3">Uso dos seus dados pessoais</h5>
                <p>A MyOwnCutlery recolhe e utiliza os seus dados pessoais para gerir o site “endereço url do site” e para lhe prestar serviços que lhe foram requisitados. Os seus dados pessoais são também utilizados para o informar de novos produtos e/ou serviços disponíveis na nossa página. Poderá ser ainda contactado no âmbito de questionários e pesquisas, para conhecer a sua opinião sobre os serviços prestados ou sobre novos serviços que poderemos vir a oferecer.</p>

                <p>A MyOwnCutlery não vende ou disponibiliza os dados dos seus clientes a terceiros. Poderá, no entanto, ser contactado em nome de parceiros de negócio sobre algumas ofertas que poderão ser do seu interesse. Nestes casos, os dados pessoais que o identificam (nome, e-mail, morada) não serão transferidos a terceiros mas partilhados com parceiros que nos ajudarão a desenvolver análises estatísticas (através de e-mail ou carta), serviço ao cliente ou entregas/recolhas. Todos estes parceiros intermediários estão proibidos de usar os seus dados para fins distintos dos enumerados acima, encontrando-se ainda obrigados a manter a confidencialidade dos mesmos.</p>


                <p>A MyOwnCutlery não usa ou revela informações pessoais sem o seu explícito consentimento.</p>
                <p>A MyOwnCutlery só fornece a sua informação, sem o seu consentimento, se requerido por lei ou se de boa-fé acreditar que esta ação é necessária:</p>
                <p>(a) Conforme alguns decretos de lei ou notificações jurídicas sobre a MyOwnCutlery ou o site;</p>
                <p>(b) Proteger e defender direitos da MyOwnCutlery;</p>
                <p>(c) Agir sobre circunstâncias especiais para proteger os utilizadores de “endereço url do site” ou o público em geral.</p>

                <h5 className="grey-text text-darken-3">Segurança dos seus dados pessoais</h5>
                <p>A MyOwnCutlery guarda as informações pessoais que nos fornece em servidores que se encontram em ambiente seguro, protegidos de acessos não autorizados, uso ou divulgação.</p>

                <h5 className="grey-text text-darken-3">Alteração ao documento</h5>
                <p>A MyOwnCutlery poderá ocasionalmente alterar esta declaração e a sua Política de Privacidade para poder refletir a imagem da empresa e o feedback dos clientes. Incentivamos os nossos clientes a reverem periodicamente a nossa Política de Privacidade, para estarem atualizados acerca de como a MyOwnCutlery protege a sua informação.</p>

                <h5 className="grey-text text-darken-3">Contactos</h5>
                <p>A MyOwnCutlery agradece os seus comentários em relação a esta Política de Privacidade. Se acredita que a MyOwnCutlery não cumpre com esta declaração, por favor contacte-nos (reipig@reipig.com). Iremos tentar avaliar a sua sugestão e responder-lhe o mais rapidamente possível.</p>
                <div className="right" >
                    <button className="btn" style={{color:'#000000', background:'#9d5d2f'}} onClick={this.handleClick}>Voltar</button>
                </div>
            </div>
        )
    }
}

export default connect()(TermosPrivacidade)