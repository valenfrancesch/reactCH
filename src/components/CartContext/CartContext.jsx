import React, { createContext, useState } from "react";

export const CartContext = React.createContext([])

const CartContextProvider = ({children}) => {
    const [cartList, setCartList] = useState([])
    const [counter, setCounter] = useState(0)

    const addToCart = (producto) => {
        const {pid, cant} = producto

        let verificador = cartList.find((produ) => produ.product.id == pid);
     
        //Si ya existe el producto en el carrito, lo actualizo
        if (verificador) {
            const actualizar = cartList.map((obj) =>
                obj.product.id == pid
                ? { ...obj, cant: obj.cant + cant }
                : obj
            )
            setCartList(actualizar)
        } else { //Sino, lo agrego
            setCartList([...cartList, producto])
        }

        setCounter((cont) => cont+cant)
    }     

    const vaciarCart = () => {
        setCartList([])
        setCounter(0)
    }

    const borrarProductCart = (productId, cantP) => {
        const actualizarCart = cartList.filter(obj => obj.product.id !== productId);
        setCartList(actualizarCart);
        setCounter((cont) => cont-cantP)
    }

    return(
        <CartContext.Provider value={{
            cartList,
            addToCart, 
            vaciarCart,
            counter,
            setCounter,
            borrarProductCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider