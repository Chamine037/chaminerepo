import React, { Component } from 'react';
import './FabricaSGRAI.css';
import * as Fabrica from './SprintB/fabrica'

export default class FabricaSGRAI extends Component {
  state = {
    linhasproducao: [],
    maquina: ''
  }


  componentDidMount() {
    Fabrica.init();
    Fabrica.animate();
  }

  componentWillUnmount() {
    var canvas = document.getElementById("sgraiDiv");
    while (canvas.firstChild) {
      console.log(canvas.firstChild)
      canvas.firstChild.remove();
    }
  }


  render() {
    return (
      <div>
        <menu style={{
          position: 'relative', display: "block",
          float: "left",
        }}>
          <input type="button" value="Toggle Wireframe"
            onClick={Fabrica.toogleWireframe} /><br />
          <input type="button" value="Reset position"
            onClick={Fabrica.resetCamera} /><br />
          <input type="button" id="save" value="Salvar coordenadas das linhas de producao" style={{ background: "red" }}
            onClick={Fabrica.saveCoordinates} /><br />
          <input type="button" id="fpBtn" value="First Person Mode" style={{ background: "red" }}
            onClick={Fabrica.firstPersonFunc} />
          <p id="text3" style={{ display: 'none' }} /><br />
          <input type="button" id="pressBtn" value="Compressor Hidralico" style={{ background: "red" }}
            onClick={Fabrica.pressAnimation} />
          <p id="text" style={{ display: 'none' }} /><br />
          <input type="button" id="drillBtn" value="Maquina de Furar" style={{ background: "red" }}
            onClick={Fabrica.drillAnimation} />
          <p id="text2" style={{ display: 'none' }} />

        </menu>
        <menu style={{
          position: 'relative', display: "block",
          float: "right", marginRight: "2%"
        }}>
          {/* Criar Maquina: <br />
          X: <input type="text-box" id="inputX" name="" /><br />
          Y: <input type="text-box" id="inputY" name="" /><br />
          Z: <input type="text-box" id="inputZ" name="" /><br />
          <input type="button" value="Adicionar Maquina"
            onClick={Fabrica.addMachine} /><br /> */}
          <p><b>Mouse Action:</b>
            <br />
            <input type="button" id="drag" value="Drag&Drop" style={{ background: "red" }}
              onClick={Fabrica.dgragFunc} /><br />
            <input type="button" id="mouseAdd" value="Add" style={{ background: "red" }}
              onClick={Fabrica.mouseAddFunc} /><br />
            <input type="button" id="mouseDelete" value="Delete" style={{ background: "red" }}
              onClick={Fabrica.mouseDeleteFunc} />
              {Fabrica.selectAdd(this.state.maquina)}
          </p>
          <b>Escolher maquina</b>
          <br />
          <select className="browser-default" value={this.state.maquina}
            onChange={(e) => this.setState({ maquina: e.target.value })} >
            <option value="none" key="" hidden> Selecione uma opção</option>
            <option value="robo">Maquina Robo</option>
            <option value="maquinafurar">Maquina de Furar</option>
            <option value="prensa">Maquina de prensar</option>
            {console.log(this.state.maquina)}
          </select>
        </menu>

        <div id="sgraiDiv">
          <canvas id="maincanvas" width="1920" height="600"></canvas>
          <div id="tooltip" className="tooltip"></div>
        </div>
      </div>
    );
  }
}