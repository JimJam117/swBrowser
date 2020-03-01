import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/header.jsx';

// page imports
import List from './components/list';
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
          <Route path="/characters" exact render={() => <List  title="Characters" linkName="character" apiRef="people"/>}/>
          <Route path="/planets" exact render={() => <List  title="Planets" linkName="planet" apiRef="planets"/>}/>
          <Route path="/ships" exact render={() => <List  title="Ships" linkName="ship" apiRef="starships"/>}/>

          <Route path= "/character/:id" component={characterDetail}/>
          <Route path= "/planet/:id" component={planetDetail}/>
          <Route path= "/ship/:id" component={shipDetail}/>

        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
 