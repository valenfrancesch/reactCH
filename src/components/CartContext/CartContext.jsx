import React, { createContext, useState } from "react";

export const CartContext = React.createContext([])

const CartContextProvider = ({children}) => {
    const [cartList, setCartList] = useState([])

    const addToCart = (producto) => {
        
        const {pid} = producto

        const verificador = cartList.find((produ) => produ.product.id == pid);
     
        //Si ya existe el producto en el carrito, lo actualizo
        if (verificador) {
            const actualizar = cartList.map((obj) =>
            obj.product.id == pid ? producto : obj
            );
            setCartList(actualizar);
        } else { //Sino, lo agrego
            setCartList([...cartList, producto]);
        }

    }     

    return(
        <CartContext.Provider value={{
            cartList,
            addToCart, 
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider