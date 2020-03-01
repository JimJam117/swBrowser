import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/header.jsx';

// page imports
import Characters from './components/characters';
import Planets from './components/planets';
import Ships from './components/ships';
import Home from './components/home';

// detials pages
import {characterDetail} from './components/details/characterDetail';
import {planetDetail} from './components/details/planetDetail';
import {shipDetail} from './components/details/shipDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/characters" exact component={Characters}/>
          <Route path="/planets" component={Planets}/>
          <Route path="/ships" component={Ships}/>

          <Route path= "/character/:id" component={characterDetail}/>
          <Route path= "/planet/:id" component={planetDetail}/>
          <Route path= "/ship/:id" component={shipDetail}/>

        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
 