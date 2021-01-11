import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import './Notfound.css'
import "reactjs-popup/dist/index.css";
import { Context } from '../../contexts/Context';
import { useHistory } from 'react-router-dom'



function Notfound() {
    const history = useHistory()
    
    const handleClick = () => {
        history.push("/home");
    }
  
    return (
        <div className="pagenotfound">
            <h1>Strona nie istnieje lub nie masz uprawnień do jej odwiedzenia!</h1>
            <br />
            <Button onClick={handleClick} variant="primary">
                Powrót na stronę główną
            </Button>
        </div>
    )
}

export default Notfound
