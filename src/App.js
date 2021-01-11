import React, { Component, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/home/Home'
import Menu from './components/menu/Menu'
import Login from './components/login/Login'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ContextProvider from './contexts/Context'



function App() {
    useEffect(() => {
        document.title = "Pizzeria Politechniki Wrocławskiej";
    }, []);
    
  return (
    <ContextProvider>
      <Router>
      <div className="App">
          <Navbar/>
          <Switch>
          <Route path="/login">
              <Login />
            </Route>
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
    </ContextProvider>
    );
}

export default App;
