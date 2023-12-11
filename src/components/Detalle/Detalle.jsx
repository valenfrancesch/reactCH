import { useContext, useEffect, useState } from "react"
import { Link, useParams} from "react-router-dom"
import { ItemCounter } from "../ItemCounter/ItemCounter"
import { CartContext } from "../CartContext/CartContext"
import {doc, getDoc, getFirestore} from 'firebase/firestore'

const Loading = () => {
    return <h2>Cargando...</h2>
}

const ProductoInexistente = () => {
    return (<>
    <h3>Producto no encontrado</h3>
    <Link to="/"><button>Ir al inicio</button></Link>
    </>)
}

const Detalle = () => {
    const [product, setProducts ] = useState([])
    const [ loading, setLoading ]   = useState(true)
    const { pid } = useParams()
    const [existeP, setExisteP] = useState(true)

    useEffect(() =>{
        const dbFireStore = getFirestore()
        const queryDoc = doc(dbFireStore, 'products', pid)
        getDoc(queryDoc)
            .then(res => {
                if(res._document == null){
                    setExisteP(false)
                }else{
                    setProducts({
                        id: res.id, ...res.data()
                    }) 
                }
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))

    }, [])
                
    const {addToCart} = useContext(CartContext)

    const agregar = (cant) => {
        addToCart({product, cant, pid})
    }
    
    return (<>{ loading ? <Loading /> :  
        existeP ?
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
        </div> : <ProductoInexistente/>
        }</>)
}

export default Detalle