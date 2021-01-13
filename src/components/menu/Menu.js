import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";
import { Context } from '../../contexts/Context';
import './Menu.css';

const menuColumns = [
    {
        dataField: "productName",
        text: "Nazwa",
    },
    {
        dataField: "ingredients",
        text: "Składniki",
    },
    {
        dataField: "size",
        text: "Rozmiar",
    },
    {
        dataField: "price",
        text: "Cena",
    }
];

const cartColumns = [
    {
        dataField: "productName",
        text: "Nazwa",
    },
    {
        dataField: "size",
        text: "Rozmiar",
    },
    {
        dataField: "price",
        text: "Cena",
    },
];

const tables =["1", "2", "3", "4", "5", "6", "7", "8", "9"]


function Menu() {
    const history = useHistory()
    const [menuItems, setMenuItems] = useState([])
    const [shoppingCart, setShoppingCart] = useState([])
    const [popupOpen, setPopupOpen] = useState(false)
    const [name, setName] = useState('')
    const [tableNumer, setTableNumber] = useState(tables[0])
    const [orderValue, setOrderValue] = useState()
    const [orderNotes, setOrderNotes] = useState([])
    const [billId, setBillId] = useState("999")
    const { user, setUser } = useContext(Context)
    const {logged, setLogged} = useContext(Context)
    const [popupNoResp, setPopupNoResp] = useState(false)
    const [popupNotLogged, setPopupNotLogged] = useState(false) 

    useEffect(() => {
        getMenu()
      }, [])


    const buttonOrderHandler = () => {
        if(logged == true) {
            calcOrderValue()
            setPopupOpen(true)
        }
        else {
            setPopupNotLogged(true)
        }
    }
    
    const orderButtonClick = () => {
        console.log(name)
        console.log(tableNumer)
        sendOrder()
        setPopupOpen(false)
        getMenu()
    }

    const sendOrder = async () => {

        var jsonArr = [];
        shoppingCart.forEach((product, index) => {
            jsonArr.push({
                comment: orderNotes[index],
                productId: product.productId,
                })
        })

        await fetch(`/addorder`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order: jsonArr,
                waiter: user,
                table: tableNumer,
                clientName: name
            })
        })

    }

    const getMenu = async () => {
        const response = await fetch(`/menu`)
        if(!(response.status >= 200 && response.status < 300)) {
                setPopupNoResp(true);
                return;
            };
        const data = await response.json();
        console.log(data)
        const menu = [];
        data.map(item => {
            menu.push({
                productName: item[1],
                ingredients: item[7],
                size: item[5] + " " + item[6],
                price: item[3] + " zł",
                productId: item[0],
                quantity: item[2],
                type: item[4]
            })
        })
        setMenuItems(menu)
    }

    const calcOrderValue = () => {
        var value = 0
        shoppingCart.forEach(item => {
            var price = item.price.split(" ")
            value += parseFloat(price[0])
        })
        setOrderValue(value)
    }

    return (
        <div className="all-container">
            <Popup modal 
            open={popupNoResp} 
            onClose = {() => {
                setPopupNoResp(false)
                history.push("/home")
                }}
            >
                <div className="noresponse-popup">
                    Serwer nie odpowiada! Proszę spróbować ponownie za jakiś czas.
                </div>
            </Popup>
            <Popup modal 
            open={popupNotLogged} 
            onClose = {() => {setPopupNotLogged(false)}}
            >
                <div className="notlogged-popup">
                    Opcja dostępna tylko po zalogowaniu!
                </div>
            </Popup>
            <div className="container">
                <div className="menu-container"> 
                    <h1>MENU</h1>
                    <Table bordered hover >
                        <thead>
                            <tr>
                                {menuColumns.map(column => <td>{column.text}</td>)}
                            </tr>
                        </thead>
                        <tbody>
                            {menuItems.map((item, index) => (
                                <tr>
                                    {menuColumns.map(column => <td>{item[column.dataField]}</td>)}
                                    <td><Button variant="dark" onClick={() => {
                                        setShoppingCart([...shoppingCart, menuItems[index]])
                                        console.log(shoppingCart)
                                    }}><FiShoppingCart/></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <div className="cart-container">
                    <div className="cart">
                        <h1>ZAMÓWIENIE</h1>
                        <Table bordered hover >
                            {/* <thead>
                                <tr>
                                    {cartColumns.map(column => <td>{column.text}</td>)}
                                </tr>
                            </thead> */}
                            <tbody>
                                {shoppingCart.map((item, index) => (
                                    <tr>
                                        {cartColumns.map(column => <td>{item[column.dataField]}</td>)}
                                        <td>
                                            <Form.Control 
                                            as="textarea" 
                                            rows={2} 
                                            value={orderNotes[index]} 
                                            onChange={({target:{value}}) => {
                                                let newArr = [...orderNotes]
                                                newArr[index] = value
                                                setOrderNotes(newArr)
                                            }}/>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => {
                                                let tempShoppingCart = [...shoppingCart]
                                                tempShoppingCart.splice(index, 1)                                                
                                                setShoppingCart(tempShoppingCart)
                                                let tempOrderNotes = [...orderNotes]
                                                tempOrderNotes.splice(index, 1)
                                                setOrderNotes(tempOrderNotes)
                                            }}>
                                                <ImCross/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Button 
                    disabled = {shoppingCart.length == 0}
                    onClick={buttonOrderHandler}
                    >
                        Złóż zamówienie
                    </Button>
                </div>
            </div>
            
                <Popup
                modal
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                contentStyle={{ width: "488px" }}
                >
                    <div className="order-popup">
                        <Table bordered hover>
                                <tbody>
                                    {shoppingCart.map((item, index) => (
                                        <tr>
                                            {cartColumns.map(column => <td>{item[column.dataField]}</td>)}
                                            <td>
                                                <Form.Text as="text">{orderNotes[index]}</Form.Text>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Form.Text as="text">Suma: {orderValue} zł</Form.Text>
                        <div>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Imię</Form.Label>
                                <Form.Control placeholder="Imię" value={name} onChange={({target:{value}}) => setName(value)}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Numer stolika</Form.Label>
                                <Form.Control 
                                as="select" value={tableNumer} onChange={({target:{value}}) => setTableNumber(value)}
                                >
                                    {tables.map(item => <option>{item}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Button onClick={orderButtonClick}>Zamów</Button>
                        </div>
                    </div>
                </Popup>
        </div>
    )
}

export default Menu
