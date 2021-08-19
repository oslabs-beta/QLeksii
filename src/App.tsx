import React, { Component }  from "react";
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { MainContainer } from './containers/MainContainer';
import './style/app.scss';


class App extends Component {
  render() {
    return (
      // <div>
      //     <h1> Qleksii is running in chill mode! </h1>
      //     <button onClick={clicker}>Chill</button>
      
      // </div>
      <MainContainer />
    );
  }
}


export default App;