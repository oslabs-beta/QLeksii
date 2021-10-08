import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { MainContainer } from './containers/MainContainer';
import './style/app.scss';

class App extends Component {
  render() {
    return (
      <>
        {/*renders the component main container into the */}
        <MainContainer />
      </>
    );
  }
}

export default App;
