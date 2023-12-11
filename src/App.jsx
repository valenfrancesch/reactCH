import './App.css'
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import NavBar from './components/NavBar/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Detalle from './components/Detalle/Detalle'
import CartContextProvider from './components/CartContext/CartContext';
import CarritoCompras from './components/CarritoCompras/CarritoCompras';
import Orden from './components/CarritoCompras/orden';


function App() {
  return (
      <CartContextProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={<ItemListContainer></ItemListContainer>}/>
            <Route path='/categoria/:cid' element={<ItemListContainer></ItemListContainer>}/>
            <Route path='/detalle/:pid' element={<Detalle /> } />
            <Route path='/carrito' element={<CarritoCompras /> } />
            <Route path='/orden' element={<Orden/> } />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
  )
}

export default App
