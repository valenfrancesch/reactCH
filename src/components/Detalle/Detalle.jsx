import { useContext, useEffect, useState } from "react"
import { useParams} from "react-router-dom"
import { ItemCounter } from "../ItemCounter/ItemCounter"
import { CartContext } from "../CartContext/CartContext"
import {doc, getDoc, getFirestore} from 'firebase/firestore'

/* const products = [ 
    {id: 1, name: 'Remera Rosa', category: 'remeras', price: 5000, stock: 200, description: 'Remera de color rosa para mujer talle único', imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_843817-MLA72150367397_102023-O.webp'},
    {id: 2, name: 'Remera Estampa', category: 'remeras', price: 6000, stock: 100, description: 'Remera color blanco con estampa de flor talle único', imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_660014-MLA49468996744_032022-W.jpg'},
    {id: 3, name: 'Remera multicolor', category: 'remeras', price: 5000, stock: 200, description:'Remera basica multicolor talle único' ,  imageUrl:'https://rockeritos.ar/wp-content/uploads/2022/06/REMERA-BATIK.jpg'},
    {id: 4, name: 'Gorra', category: 'accesorios', price: 3000, stock: 100, description: 'Gorra color negro', imageUrl: 'https://d22fxaf9t8d39k.cloudfront.net/0f42ff43d0e6600baa6f2085e71345287a604331a86cf52241f4030caaa1234432864.jpeg'},
    {id: 5, name: 'Gorra', category: 'accesorios', price: 3000, stock: 100, description: 'Gorra color fluo', imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_620946-MLA53304322486_012023-O.webp'}
]
 */

const Detalle = () => {
    const [product, setProducts ] = useState([])
    const { pid } = useParams()

    useEffect(() =>{
        const dbFireStore = getFirestore()
        const queryDoc = doc(dbFireStore, 'products', pid)
        getDoc(queryDoc)
            .then(res => setProducts({
                id: res.id, ...res.data()
            }))
            .catch(error => console.log(error))
    }, [])
                
    const {addToCart} = useContext(CartContext)
    
    /* const product = products.find(objeto => objeto.id == pid) */

    const agregar = (cant) => {
        addToCart({product, cant, pid})
    }
    
    return (
        <div className="row">
            <div className="col-6 mt-5">
                <img src={product.imageUrl} alt="" className="img-fluid"/>
            </div>
            <div className="col-6 text-center mt-5">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>Precio: ${product.price}</p>
                <ItemCounter stock={product.stock} onAdd={agregar}/>
            </div>            
        </div>
  )
}

export default Detalle