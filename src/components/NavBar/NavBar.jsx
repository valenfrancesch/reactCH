import "./navBar.css";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";

function NavBar (){
  return (
    <nav>
      <div className="navSuperior">
        <h3 id="titulo-pag"><Link to='/'>ModaFusion</Link></h3>
        <ul>
          <li><Link to='/'>Inicio</Link></li>
          <li><Link to={`/categoria/${'remeras'}`}>Remeras</Link></li>
          <li><Link to={`/categoria/${'accesorios'}`}>Accesorios</Link></li>
          <li><Link to='/contacto'>Contacto</Link></li>
      </ul>  
        <CartWidget/>
      </div>
    </nav>
  )
}

export default NavBar;

