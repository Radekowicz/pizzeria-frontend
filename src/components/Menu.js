import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

function Menu() {
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nazwa</th>
                    <th>30cm</th>
                    <th>40cm</th>
                    <th>50cm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Margherita</td>
                    <td>16,00 zł</td>
                    <td>21,00 zł</td>
                    <td>26,00 zł</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Pepperoni</td>
                    <td>18,00 zł</td>
                    <td>24,00 zł</td>
                    <td>30,00 zł</td>
                    </tr>
                    
                </tbody>
            </Table>
        </div>
    )
}

export default Menu