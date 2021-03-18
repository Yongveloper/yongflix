import React, { Component } from 'react';
import Router from 'Components/Router';
import GloablSyles from 'Components/Common/GlobalStyle';

class App extends Component {
  render() {
    return (
      <>
        <Router />
        <GloablSyles />
      </>
    );
  }
}

export default App;
