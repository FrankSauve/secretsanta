import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Homepage from '../Homepage/Homepage';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
            <Switch>
              <Route exact path="/" component={Homepage}/>
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
