import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../CartContext/CartContext'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { Link, useNavigate} from 'react-router-dom';
import eliminar from '/src/assets/img/eliminar.png'

const CarritoVacio = () => {
    return (<>
        <p>No hay nada en el carrito</p>
        <Link to="/"><button>Ir al inicio</button></Link>
    </>)
}

function CarritoCompras() {
    const {cartList, counter, vaciarCart, borrarProductCart} = useContext(CartContext)
    const [verificador, setVerificador] = useState(0)
    const [veri, setVeri] = useState({
        nombre: 0,
        apellido: 0,
        tel: 0,
        email: 0
    })
  
    let precioFinal = 0
    const navigate = useNavigate();

    //Arma la orden
    const productosOrder = () => {
        const dataHoy = Date.now()
        const hoy = new Date(dataHoy)
        hoy.toUTCString()
    
        const order = {
            usuario,
            compra: cartList.map((obj) => ({id: obj.product.id, title: obj.product.name, price: obj.product.price, cant: obj.cant})),
            total: precioFinal,
            fecha: hoy
        }
        
        const db = getFirestore()
        const queryCollection = collection(db, 'orders')

        addDoc(queryCollection, order)
            .then(res =>{
                navigate('/Orden', { state: {num: res.id} })
            })
            .catch(err => console.log(err))

        
    }

    //Info del form
    const [usuario, setUser] = useState({
        nombre: '',
        apellido: '',
        tel: '',
        email: '',
    })
    
    const [emailV, setEmailV] = useState('')

    const validacion = () => {
        if(veri.nombre && veri.apellido && veri.tel && veri.email){
            setVerificador(true)
        }else if(verificador){
            setVerificador(false)
        }
    }

    //Controlador y validación del form
    const handleChange = (e) => {
        const { id, value } = e.target;
        //validación email
        if(id == 'validEmail'){
            if(usuario.email == value){
                setVeri({
                    ...veri,
                    ['email']: true,
                })
            }else if(veri['email']){
                setVeri({
                    ...veri,
                    ['email']: false,
                })
            }
            setEmailV(value)
        }else{
            setUser({
                ...usuario,
                [id]: value,
            })
            if(id == 'email' && emailV!=''){
                if(emailV == value){
                    setVeri({
                        ...veri,
                        [id]: true,
                    })
                }else if(veri[id]){
                    setVeri({
                        ...veri,
                        [id]: false,
                    })
                }
            }

            if(id!='email'){
                if(value!=''){
                setVeri({
                    ...veri,
                    [id]: true,
                })
                }else if(value=='' && veri[id]){
                    setVeri({
                        ...veri,
                        [id]: false,
                    })
                }
            }   
        } 
    }

    useEffect(()=>{
        validacion()
    }, [veri])  

    let keyId = 100
    //Productos del carrito
    const elementos = cartList.map((produc) => {
        const productId = produc.product.id
        const eliminarProducto = () => {
            borrarProductCart(productId, produc.cant)
        }
 
        precioFinal+=produc.product.price*produc.cant
        return(
            <Card key={keyId++} style={{ width: '99vw' }}>
                <Row>
                    <Col> 
                        <Card.Img variant="left" src={produc.product.imageUrl} style={{width: '30%'}}/>
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title>{produc.product.name}</Card.Title>
                            <Card.Text>Precio por unidad: ${produc.product.price}</Card.Text>
                            <Card.Text>Cantidad: {produc.cant}</Card.Text>
                            <Card.Text>Precio total ${produc.product.price*produc.cant}</Card.Text>
                        </Card.Body>
                    </Col>
                    <Col style={{display:'flex', alignItems:'center', justifySelf:'flex-end'}}>
                        <button onClick={eliminarProducto} style={{borderColor: 'red'}}><img src={eliminar} style={{width: '5%', margin:'5px 10px'}}></img>Eliminar producto</button>
                    </Col>
                </Row> 
            </Card>
        )
    })

    return (
        !counter ? <CarritoVacio/> : <div>
            <h2>Carrito de compras:</h2>
            {elementos}
            <button onClick={vaciarCart}>Vaciar carrito</button>
            <h5>Cantidad de productos: {counter}</h5>
            <h5>Precio total del carrito: ${precioFinal}</h5>
            <br />
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" id="nombre" placeholder="Ingrese su nombre" onChange={handleChange} style={{textAlign:'center'}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" id="apellido" placeholder="Ingrese su apellido" onChange={handleChange} style={{textAlign:'center'}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="number" id="tel" placeholder="Ingrese su número de teléfono" onChange={handleChange} style={{textAlign:'center'}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Dirección de email</Form.Label>
                    <Form.Control type="email" id="email" placeholder="Ingrese su email" onChange={handleChange} style={{textAlign:'center'}}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="email" id="validEmail" placeholder="Repita su email" onChange={handleChange} style={{textAlign:'center'}}/>
                </Form.Group>
                {verificador ? <Button variant="primary" onClick={productosOrder}>Comprar</Button>
                : <p>Debe ingresar correctamente los datos para comprar</p>}
            </Form>
        </div>
    )
}

export default CarritoCompras