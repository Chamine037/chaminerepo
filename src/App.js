import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import NavBar from './Layout/NavBar'
import DashBoard from './Home/Dashboard'
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import OperacaoMenu from './Fabrica/Operacoes/OperacaoMenu';
import CriarOperacao from './Fabrica/Operacoes/CriarOperacao';
import ListarOperacoesTipoMaquina from './Fabrica/Operacoes/ListarOperacoesTipoMaquina';
import CriarTipoMaquina from './Fabrica/TipoMaquina/CriarTipoMaquina';
import ListarOperacoes from './Fabrica/Operacoes/ListarOperacoes';
import CriarMaquina from './Fabrica/Maquina/CriarMaquina';
import ListarMaquinas from './Fabrica/Maquina/ListarMaquinas';
import ListarProduto from './Fabrica/Produto/ListarProduto';
import CriarProduto from './Fabrica/Produto/CriarProduto';
import ProdutoMenu from './Fabrica/Produto/ProdutoMenu';
import CriarLinhasProducao from './Fabrica/LinhaProducao/CriarLinhasProducao';
import ListarLinhasProducao from './Fabrica/LinhaProducao/ListarLinhasProducao';
import ListarPlanoFabrico from './Fabrica/PlanoFabrico/ListarPlanoFabrico';
import ListarTipoMaquina from './Fabrica/TipoMaquina/ListarTipoMaquina';
import CriarPlanoFabrico from './Fabrica/PlanoFabrico/CriarPlanoFabrico';
import Listar from './Fabrica/Maquina/FrontPage';
import TipoMaquinaMenu from './Fabrica/TipoMaquina/TipoMaquinaMenu';
import FabricaSGRAI from './Fabrica/SGRAI/FabricaSGRAI'
import AlterarMaquinaTipo from './Fabrica/Maquina/AlterarMaquinaTipo';
import AlterarTipoMaquinaOperacao from './Fabrica/TipoMaquina/AlterarTipoMaquinaOperacao';
import ListarMaquinaTipo from "./Fabrica/Maquina/ListarMaquinaTipo";
import PlanoFabricoMenu from "./Fabrica/PlanoFabrico/PlanoFabricoMenu";
import ConsultarPlanoDeProduto from "./Fabrica/PlanoFabrico/ConsultarPlanoDeProduto";
import AreaCliente from "./Fabrica/Cliente/AreaCliente";
import ConsultarCliente from "./Fabrica/Cliente/ConsultarCliente";
import AlterarCliente from "./Fabrica/Cliente/AlterarCliente";
import ConsultarAsAdmin from "./Fabrica/Cliente/ConsultarAsAdmin";
import TermosPrivacidade from "./Fabrica/Cliente/TermosPrivacidade";
import ConsultarEncomenda from "./Fabrica/Encomenda/ConsultarEncomenda";
import CriarEncomenda from "./Fabrica/Encomenda/CriarEncomenda";
import CancelarEncomenda from "./Fabrica/Encomenda/CancelarEncomenda";
import EncomendaMenu from "./Fabrica/Encomenda/EncomendaMenu";
import AlterarEncomenda from "./Fabrica/Encomenda/AlterarEncomenda";
import HistoricoEncomenda from "./Fabrica/Encomenda/HistoricoEncomenda";
import ConsultarEncomendaCliente from './Fabrica/Encomenda/ConsultarEncomendaCliente';
import SolicitarAlteracao from './Fabrica/Solicitacao/SolicitarAlteracao';
import ConsultarEncomendaProdutoMais from "./Fabrica/Encomenda/ConsultarEncomendaProdutoMais";
import Solicitacoes from './Fabrica/Solicitacao/Solicitacoes';
import AtivarDesativarMaquina from './Fabrica/Maquina/AtivarDesativarMaquina';
import AlterarClientes from './Fabrica/Cliente/AlterarClientes';
import ListarProdutoByTempoProducao from './Fabrica/Encomenda/ListarProdutoByTempoProducao';
import ListarProdutosMaisVezesEncomendados from './Fabrica/Encomenda/ListarProdutosMaisVezesEncomendados';
import ApagarCliente from './Fabrica/Cliente/ApagarCliente';


class App extends Component {
  render() {
    return (
      <HashRouter basename="Chamine037">
        <div className="app">
          <NavBar />
          <Switch>
            <Route exact path='/' component={DashBoard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/operacaomenu' component={OperacaoMenu} />
            <Route path='/criaroperacao' component={CriarOperacao} />
            <Route path='/operacoes' component={ListarOperacoes} />
            <Route path='/listaroperacaotipo' component={ListarOperacoesTipoMaquina} />
            <Route path='/listartipomaquina' component={ListarTipoMaquina} />
            <Route path='/criartipomaquina' component={CriarTipoMaquina} />
            <Route path='/tipomaquinamenu' component={TipoMaquinaMenu} />
            <Route path='/alterartipomaquinaoperacao' component={AlterarTipoMaquinaOperacao} />
            <Route path='/listarmaquinatipo' component={ListarMaquinaTipo} />
            <Route path='/maquinamenu' component={Listar} />
            <Route path='/maquina' component={ListarMaquinas} />
            <Route path='/criarmaquina' component={CriarMaquina} />
            <Route path='/alterarmaquinatipo' component={AlterarMaquinaTipo} />
            <Route path='/produto' component={ListarProduto} />
            <Route path='/criarproduto' component={CriarProduto} />
            <Route path='/produtomenu' component={ProdutoMenu} />
            <Route path='/linhaproducao' component={CriarLinhasProducao} />
            <Route path='/listarlp' component={ListarLinhasProducao} />
            <Route path='/planofabricomenu' component={PlanoFabricoMenu} />
            <Route path='/listarplanosfabrico' component={ListarPlanoFabrico} />
            <Route path='/criarplanofabrico' component={CriarPlanoFabrico} />
            <Route path='/consultarplanofabricoproduto' component={ConsultarPlanoDeProduto} />
            <Route path='/areacliente' component={AreaCliente} />
            <Route path='/consultarcliente' component={ConsultarCliente} />
            <Route path='/alterarcliente' component={AlterarCliente} />
            <Route path='/consultarasadmin' component={ConsultarAsAdmin} />
            <Route path='/termos' component={TermosPrivacidade} />
            <Route path='/encomendas' component={EncomendaMenu} />
            <Route path='/consultarencomendas' component={ConsultarEncomenda} />
            <Route path='/alterarencomendas' component={AlterarEncomenda} />
            <Route path='/criarencomendas' component={CriarEncomenda} />
            <Route path='/cancelarencomendas' component={CancelarEncomenda} />
            <Route path='/historicoencomendas' component={HistoricoEncomenda} />
            <Route path='/sgrai' component={FabricaSGRAI} />
            <Route path='/consultarencomendascliente' component={ConsultarEncomendaCliente} />
            <Route path='/consultarencomendaprodutomais' component={ConsultarEncomendaProdutoMais} />
            <Route path='/solicitaralteracao' component={SolicitarAlteracao} />
            <Route path='/solicitacoes' component={Solicitacoes} />
            <Route path='/ativardesativarmaquina' component={AtivarDesativarMaquina} />
            <Route path='/alterarclientes' component={AlterarClientes} />
            <Route path='/listarprodutotempo' component={ListarProdutoByTempoProducao} />
            <Route path='/produtomaisvezesencomendado' component={ListarProdutosMaisVezesEncomendados} />
            <Route path='/apagarconta' component={ApagarCliente} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}



export default App;

