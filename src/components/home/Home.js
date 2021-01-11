import React, { useEffect } from 'react';
import "./Home.css"
import pizza from './pizza.png'
function Home() {

    
    return (
        <div>
            <h1>Tymczasowa strona główna</h1>
            <p>Trafiłeś na serwer deweloperski Pizzerii Politechniki Wrocławskiej.</p>
            <p>Tutaj nie liczy się treść, a zdobyta wiedza!</p>
            <img src={pizza} className="App-logo" alt="logo" />
        </div>
    )
}

export default Home
