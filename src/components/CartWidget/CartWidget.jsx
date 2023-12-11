import React, {useContext, useEffect, useState } from 'react'
import carrito from '/src/assets/img/carrito-de-compras.png';
import './cartWidget.css'
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';

function CartWidget() {
    const {counter} = useContext(CartContext)
    return (
        <div className="carroCompras">
            <p>{counter}</p>
            <Link to='/carrito'><img src={carrito} alt="Carrito de compras" width={"30px"}/></Link>
        </div>
    )
}

export default CartWidget