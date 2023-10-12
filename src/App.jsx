import './App.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import NavBar from './components/NavBar/NavBar'


function App() {
  return (
    <>
      <NavBar></NavBar>
      <ItemListContainer greeting={'Holaa! Bienvenidos a esta tienda'}></ItemListContainer>
    </>
  )
}

export default App
