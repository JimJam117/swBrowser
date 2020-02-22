import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/header.jsx';

import {characters as Characters} from './components/characters';
import {planets as Planets} from './components/planets';
import {ships as Ships} from './components/ships';
import {home as Home} from './components/home';
import Character from './character';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/characters" component={Characters}/>
          <Route path="/planets" component={Planets}/>
          <Route path="/ships" component={Ships}/>

          {/* <Route path= "/characters/:id" component={CharacterDetail}/>
          <Route path= "/planets/:id" component={PlanetsDetail}/>
          <Route path= "/ships/:id" component={ShipsDetail}/> */}

        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
 