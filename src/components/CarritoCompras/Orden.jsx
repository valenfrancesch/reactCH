import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Orden(props) {
    const location = useLocation();
    const num = location?.state?.num || 'no definido'
    return (
        <div>
            <h1>Muchas gracias por tu compra!</h1>
            <p>Tu número de orden es: {num}</p>
        </div>
    )
}
