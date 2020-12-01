import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Menu from './components/menu/Menu'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
    <div className="App">
      
        <Navbar/>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </div>
    </Router>  
    );
}

export default App;
