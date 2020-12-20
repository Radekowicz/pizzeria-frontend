import React, { useEffect } from 'react';
import "./Home.css"
import pizza from './pizza.jpg'
function Home() {

    const getMenu = async () => {
        const url = "/menu";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";
        // const url = "http://localhost:5000/menu"; // site that doesn’t send Access-Control-*
        // fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
        // .then(response => response.text())
        // .then(contents => console.log(contents))
        // .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }

    

    useEffect(() => {
        //getMenu()
      }, [])

    return (
        <img src={pizza} className="App-logo" alt="logo" />
    )
}

export default Home