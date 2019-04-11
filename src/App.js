import React, { Component } from 'react';
import './App.css';

import HomePage from './home';

class App extends Component {
  constructor(props) {
    super()
  }
  render() {
    return (
      <div className="App">
          <HomePage />
      </div>
    );
  }
}

export default App;
