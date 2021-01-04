import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { Navbar, Nav, NavItem, Form, Button } from 'react-bootstrap';
import './Login.css'
import { Context } from '../../contexts/Context';


function Login() {

    const [typedNickname, setTypedNickname] = useState()
    const [typedPassword, setTypedPassword] = useState()
    const history = useHistory()
    const { user, setUser, setLogged } = useContext(Context)

    const checkLogin = async () => {
        console.log("check login")
        const response = await fetch(`/user`, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nickname: typedNickname,
                password: typedPassword
            })
        })

        // const response = await fetch(`/user`);
        //console.log(response)
        const isCorrect = await response.json()
        console.log(isCorrect)
        return isCorrect
    }




    const onClick = () => {
        checkLogin().then((isCorrect) => {
            if (isCorrect === true) {
                setLogged(true)
                setUser(typedNickname)
                history.push("/home");
            }
        })
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