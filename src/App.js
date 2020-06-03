import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';

// import container
import Main from './containers/main/index';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={Main} />
        </Switch>
      </div>
    );
  }
}

export default App;
