import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
declare global {
  // renders the window with the darkmode functionality off on load
  interface Window {
    darkMode: {
      toggle: () => void;
      switch: () => void;
    };
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
