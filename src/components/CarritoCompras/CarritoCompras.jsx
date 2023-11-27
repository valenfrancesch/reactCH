import React, { useContext, useState } from 'react'
import { CartContext } from '../CartContext/CartContext'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {addDoc, collection, getFirestore} from 'firebase/firestore'
import { Link, useNavigate} from 'react-router-dom';

function CarritoCompras() {
    const {cartList} = useContext(CartContext)
    let elementos = (<p>No hay nada en el carrito</p>)
    if(cartList.length == 0){
        return elementos
    }

    let precioFinal = 0
/*     let numOrden */

    const navigate = useNavigate();

    //Arma la orden
    const productosOrder = () => {
        const order = {
            usuario,
            compra: cartList.map((obj) => ({id: obj.product.id, title: obj.product.name, price: obj.product.price, cant: obj.cant})),
            total: precioFinal
        }
        
        const db = getFirestore()
        const queryCollection = collection(db, 'orders')

        addDoc(queryCollection, order)
            .then(res =>{
                navigate('/Orden', { state: {num: res.id} })
            })
            .catch(err => console.log(err))
        console.log("me fui")
    }

    const [usuario, setUser] = useState({
        nombre: '',
        apellido: '',
        tel: '',
        email: '',
    });
    
    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser({
        ...usuario,
        [id]: value,
        });
    };
      
    let keyId = 0
    elementos = cartList.map( (produc) => {
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
                </Row> 
            </Card>
        )
    })

    return (
        <div>
            <h2>Carrito de compras:</h2>
            {elementos}
            <h5>Precio total del carrito: ${precioFinal}</h5>
            <br />
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" id="nombre" placeholder="Ingrese su nombre" onChange={handleChange} style={{textAlign:'center'}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" id="apellido" placeholder="Ingrese su apellido" onChange={handleChange} style={{textAlign:'center'}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="number" id="tel" placeholder="Ingrese su número de teléfono" onChange={handleChange} style={{textAlign:'center'}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Dirección de email</Form.Label>
                    <Form.Control type="email" id="email" placeholder="Ingrese su email" onChange={handleChange} style={{textAlign:'center'}}/>
                </Form.Group>
                <Button variant="primary" onClick={productosOrder} >
                    Comprar
                </Button>
            </Form>
        </div>
        
    )
}

export default CarritoCompras