import React, { useState } from 'react'
import carrito from '/src/assets/img/carrito-de-compras.png';
import './cartWidget.css'

function CartWidget() {
    const [counter, cambiarValorDeCounter] = useState(0)
    const handleCounter = () => {
        cambiarValorDeCounter(counter+1)
    }
    return (
        <div className="carroCompras">
            <p>{counter}</p>
            <img src={carrito} alt="Carrito de compras" width={"30px"} />
        </div>
    )
}

export default CartWidget