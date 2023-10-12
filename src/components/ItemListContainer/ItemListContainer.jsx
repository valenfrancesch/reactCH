import React from 'react'

function ItemListContainer({greeting = 'Bienvenido'}) {
    return (
        <div>
            <h1>{greeting}</h1>
        </div>
    )
}

export default ItemListContainer