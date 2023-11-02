import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import NavBar from './components/NavBar/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Detalle from './components/Detalle/Detalle'

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element={<ItemListContainer></ItemListContainer>}/>
        <Route path='/categoria/:cid' element={<ItemListContainer></ItemListContainer>}/>
        <Route path='/detalle/:pid' element={<Detalle /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
