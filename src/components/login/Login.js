import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { Navbar, Nav, NavItem, Form, Button } from 'react-bootstrap';
import './Login.css'
import { Context } from '../../contexts/Context';


function Login() {

    const [typedNickname, setTypedNickname] = useState()
    const [typedPassword, setTypedPassword] = useState()
    const history = useHistory()
    const { user, setUser } = useContext(Context)

    const checkLogin = async () => {
        const response = await fetch(`/employees?nickname=${typedNickname}&password=${typedPassword}`);
        const data = await response.json();
        
    }


    const onClick = () => {
        if (typedNickname === "a" && typedPassword === "s") {
            history.push("/home");
        }
    }

    return (
        <div>
            <div className="form">
                <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control 
                    type="login" 
                    placeholder="Enter nickname"                
                    onChange={({target:{value}}) => {
                        setTypedNickname(value)
                    }}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    onChange={({target:{value}}) => {
                        setTypedPassword(value)
                    }}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onClick}>
                    Submit
                </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login