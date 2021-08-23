import React, { Component }  from "react";
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
const path = require('path');
// const {app, BrowserWindow} = require('electron');
import { MainContainer } from './containers/MainContainer';
import './style/app.scss';


class App extends Component {

  render() {
    return (
      <>
      <MainContainer />
       {/* <button onClick={renderWindow}>Test</button> */}
            {/* <button onClick={createBrowserWindow}>Test</button> */}
      </>
    );
  }
}


export default App;