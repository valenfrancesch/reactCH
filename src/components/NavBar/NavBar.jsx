import "./navBar.css";
import CartWidget from "../CartWidget/CartWidget";

function NavBar (){
  return (
    <nav>
      <div className="navSuperior">
        <h3 id="titulo-pag">ModaFusion</h3>
        <ul>
          <li><a href="">Inicio</a></li>
          <li><a href="">Ropa Mujer</a></li>
          <li><a href="">Accesorios</a></li>
          <li><a href="">Contacto</a></li>
      </ul>  
        <CartWidget></CartWidget>
      </div>
    </nav>
  )
}

export default NavBar;

