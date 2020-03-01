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

// functions used for rendering
function CharacterList() {
 return(<List  title="Characters" linkName="character" apiRef="people"/>); 
}

function PlanetList() {
  return(<List  title="Planets" linkName="planet" apiRef="planets"/>); 
 }

 function ShipList() {
  return(<List  title="Ships" linkName="ship" apiRef="starships"/>); 
 }

// main function
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/characters" component={CharacterList} />
          <Route path="/planets" exact component={PlanetList}/>
          <Route path="/ships" exact component={ShipList}/>

          <Route path= "/character/:id" component={characterDetail}/>
          <Route path= "/planet/:id" component={planetDetail}/>
          <Route path= "/ship/:id" component={shipDetail}/>

        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
 