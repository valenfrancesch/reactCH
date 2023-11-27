import React, {useState } from 'react'
import carrito from '/src/assets/img/carrito-de-compras.png';
import './cartWidget.css'
import { Link } from 'react-router-dom';

function CartWidget() {
    const [counter, cambiarValorDeCounter] = useState(0)

    return (
        <div className="carroCompras">
            <Link to='/carrito'><img src={carrito} alt="Carrito de compras" width={"30px"}/></Link>
        </div>
    )
}

export default CartWidget