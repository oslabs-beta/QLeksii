import React, { Component }  from "react";
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import './style/app.scss';


class App extends Component {
  constructor(){
  super()
  this.state={
    arr: []
  }
  }

  render() {
    const clicker=(e)=>{
      fetch("http://localhost:3333/").then(res => res.json()).then(res=> console.log(res))
    }
    return (
      <div>
          <h1> Qleksii is running in chill mode! </h1>
          <button onClick={clicker}>Chill</button>
      
      </div>
    );
  }
}


export default App;