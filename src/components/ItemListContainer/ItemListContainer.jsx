import React, { useEffect, useState } from 'react'
import {collection, getDocs, getFirestore} from 'firebase/firestore'
import './listContainer.css'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ItemListContainer(props) {
    const {cid:categoria} = useParams()

    const [products, setProducts ] = useState([])

    useEffect(() =>{
        const dbFireStore = getFirestore()
        const queryCollec = collection(dbFireStore, 'products')
        getDocs(queryCollec)
            .then(res => setProducts(res.docs.map( (produc) => ({
                id: produc.id, ...produc.data()
            }))))
            .catch(error => console.log(error))
    }, [])
            
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