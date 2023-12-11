import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from '../CartContext/CartContext';

export default function Orden() {
    const {vaciarCart} = useContext(CartContext)
    const location = useLocation();
    const num = location?.state?.num || 'no definido'
    
    const vaciarCarro = () => {
        vaciarCart()
    }
   
    return (
        <div>
            <h1>Muchas gracias por tu compra!</h1>
            <p>Tu número de orden es: {num}</p>
            <Link to='/'><button>Ir al incio</button></Link>
            {vaciarCarro}
        </div>)
}
