import React, {useState, useEffect, useContext} from 'react'
import { CartContext} from '../CartContext/CartContext'
import { Link } from 'react-router-dom'

export const ItemCounter = ({initial=1, stock=10, onAdd}) => {
    const[count, setCount] = useState(initial)

    const {cartList} = useContext(CartContext)
    
    const handleOnAdd = () => {
        onAdd(count)
    }

    const useCounter = (min, max) => {
        const handleSuma = () => {
            if(count < max){
                setCount(count+1)
            }
        }
    
        const handleResta = () => {
            if(count > min){
                setCount(count-1)
            }
        }

        return {
            count,
            handleResta,
            handleSuma
        }
    }

    const {handleResta, handleSuma} = useCounter(initial, stock)

    return (
        <div>
            <p>Agregar al Carrito</p>
            <div>
                <button onClick={handleSuma}>+</button>
                <button onClick={handleResta}>-</button>
                <button onClick={handleOnAdd}>Agregar al carrito</button>
                <br />
                <Link to='/carrito'><button onClick={handleOnAdd}>Ir al carrito</button></Link>
            </div>
            <div>
                <p>Cantidad seleccionada: {count} </p>
            </div>
        </div>
    )
}

// Detalle del carrito