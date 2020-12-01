import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { ImCross } from 'react-icons/im';
import './Menu.css'


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


    return (
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
                        <thead>
                            <tr>
                                {cartColumns.map(column => <td>{column.text}</td>)}
                            </tr>
                        </thead>
                        <tbody>
                            {shoppingCart.map((item, index) => (
                                <tr>
                                    {cartColumns.map(column => <td>{item[column.dataField]}</td>)}
                                    <td>
                                        <Form.Control as="textarea" rows={3} />
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => {
                                            setShoppingCart(shoppingCart.filter(item => item !== shoppingCart[index])) //(BUG)deletes all same items
                                        }}>
                                            <ImCross/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <Button>Złóż zamówienie</Button>
            </div>
        </div>
    )
}

export default Menu