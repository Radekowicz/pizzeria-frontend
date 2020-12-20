import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';
import './Menu.css'
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";


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

    const [menuItems, setMenuItems] = useState([
        {
            productName: "Margheritta",
            ingredients: "sos, ser",
            size: "30 cm",
            price: "24 zł"
        },
        {
            productName: "Hawajska",
            ingredients: "sos, ser, szynka, ananas",
            size: "40 cm",
            price: "30 zł"
        },
        {
            productName: "Capri",
            ingredients: "sos, ser, szynka, pieczarki",
            size: "40 cm",
            price: "31 zł"
        },
        {
            productName: "Pepperoni",
            ingredients: "sos, ser, salami",
            size: "30 cm",
            price: "24 zł"
        },
        {
            productName: "Farmerska",
            ingredients: "sos, ser, kurczak, papryka, kukurydza",
            size: "40 cm",
            price: "30 zł"
        },
        {
            productName: "Wege",
            ingredients: "sos, ser, cebula, pieczarki, oliwki",
            size: "40 cm",
            price: "31 zł"
        }
    ])
    const [shoppingCart, setShoppingCart] = useState([])
    const [popupOpen, setPopupOpen] = useState(false)
    const [name, setName] = useState('')
    const [tableNumer, setTableNumber] = useState(tables[0])
    const [orderValue, setOrderValue] = useState()
    const [orderNotes, setOrderNotes] = useState([])


    // useEffect(() => {
    //     fillNotes()
    // }, [])


    const orderButtonClick = () => {
        console.log(name)
        console.log(tableNumer)
        sendOrder()
        setPopupOpen(false)
    }

    const sendOrder = async () => {
        //POST to database
    }

    const getMenu = async () => {
        const response = await fetch(`/products`);
        const data = await response.json();
        console.log(data)
        const menu = [];
        data.map(item => {
            menu.push({
                productName: item.productName,
                ingredients: item.ingredients,
                size: item.size,
                price: item.price
            })
        })
        setMenuItems(menu)
    }

    const calcOrderValue = () => {
        var value = 0
        shoppingCart.forEach(item => {
            var price = item.price.split(" ")
            value += parseInt(price[0])
        })
        setOrderValue(value)
    }

    return (
        <div className="all-container">
            <div className="container">
                <div className="menu-container"> 
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
                    <Button onClick={() => {
                        calcOrderValue()
                        setPopupOpen(true)
                        }}
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