import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Header from './components/header.jsx';

// page imports
import List from './components/list';
import Home from './components/home';
import NotFound from './components/errors/NotFound';
import PageExpired from './components/errors/PageExpired';
import ServerError from './components/errors/ServerError';

// detials pages
import {characterDetail} from './components/details/characterDetail';
import {planetDetail} from './components/details/planetDetail';
import {shipDetail} from './components/details/shipDetail';

// functions used for rendering
function CharacterList() {
 return(<List  title="Characters" linkName="character" apiRef="people" pageNumb={1}/>); 
}

function PlanetList() {
  return(<List  title="Planets" linkName="planet" apiRef="planets" pageNumb={1}/>); 
 }

 function ShipList() {
  return(<List  title="Ships" linkName="ship" apiRef="starships" pageNumb={1}/>); 
 }

// main function
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>

          <Route path= "/not-found" component={NotFound}/>
          <Route path= "/page-expired" component={PageExpired}/>
          <Route path= "/server-error" component={ServerError}/>

          <Route path="/characters" exact component={() => CharacterList()} />
          <Route path="/planets" exact component={() => PlanetList()}/>
          <Route path="/ships" exact component={() => ShipList()}/>

          <Route path="/characters/:id" component={CharacterList} />
          <Route path="/planets/:id"  component={PlanetList}/>
          <Route path="/ships/:id"  component={ShipList}/>

          <Route path= "/character/:id" component={characterDetail}/>
          <Route path= "/planet/:id" component={planetDetail}/>
          <Route path= "/ship/:id" component={shipDetail}/>

          <Route path="/" component={Home}/>

        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
 