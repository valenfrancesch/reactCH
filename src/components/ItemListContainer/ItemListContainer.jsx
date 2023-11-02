import React from 'react'
import './listContainer.css'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ItemListContainer(props) {
    const { cid:categoria} = useParams()

    const products = [ 
        {id: 1, name: 'Remera Rosa', category: 'remeras', price: 5000, stock: 200, description: 'Remera de color rosa para mujer talle único', imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_843817-MLA72150367397_102023-O.webp'},
        {id: 2, name: 'Remera Estampa', category: 'remeras', price: 6000, stock: 100, description: 'Remera color blanco con estampa de flor talle único', imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_660014-MLA49468996744_032022-W.jpg'},
        {id: 3, name: 'Remera multicolor', category: 'remeras', price: 5000, stock: 200, description:'Remera basica multicolor talle único' ,  imageUrl:'https://rockeritos.ar/wp-content/uploads/2022/06/REMERA-BATIK.jpg'},
        {id: 4, name: 'Gorra', category: 'accesorios', price: 3000, stock: 100, description: 'Gorra color negro', imageUrl: 'https://d22fxaf9t8d39k.cloudfront.net/0f42ff43d0e6600baa6f2085e71345287a604331a86cf52241f4030caaa1234432864.jpeg'},
        {id: 5, name: 'Gorra', category: 'accesorios', price: 3000, stock: 100, description: 'Gorra color fluo', imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_620946-MLA53304322486_012023-O.webp'}
    ]

    let productsCategoria = []
    
    if(typeof categoria == "string" ){
        productsCategoria = products.filter((produc) => produc.category == categoria)
    }else{
        productsCategoria = products;
    }
 
    const productsElements = productsCategoria.map(product => (
        <div key={product.id} className="card w-25">
            <img src={product.imageUrl} className="card-img-top" alt={product.name} />
            <div className="card-body">
                <p>{product.name}</p>
                <p>${product.price}</p>
            </div>
            <div className="card-footer">
                <button className="btn w-100"><Link to={`/detalle/${product.id}`}>detalle</Link></button>
            </div>
        </div>
    ));

    return (
        <div className="products-container">
            {productsElements}
        </div>
    );
    
}

export default ItemListContainer