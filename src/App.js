import React, { Component, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import './App.css';
import Navbar from './components/Navbar'
import Home from './components/home/Home'
import Menu from './components/menu/Menu'
import Login from './components/login/Login'
import User from './components/user/User'
import Notfound from './components/notfound/Notfound'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
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
            <Route exact path="/">
               <Redirect to="/home" />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/user"  component={User} />
            <Route exact path="/home"  component={Home} />
            <Route exact path="/menu"  component={Menu} />
            <Route exact path="/404"   component={Notfound} />
            <Redirect to="/404" />
          </Switch>
      </div>
      </Router> 
    </ContextProvider>
    );
}

export default App;
