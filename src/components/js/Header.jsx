import "../css/Header.css"
import { FaSearch, FaStar } from "react-icons/fa"

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="/logo.png" alt="CifraJr" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="O que você quer tocar hoje?" />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
        <div className="nav-buttons">
          <button className="curso-button">
            <FaStar /> Cursos
          </button>
          <button className="nav-link">Listas</button>
          <button className="nav-link">Aprenda</button>
          <button className="nav-link">Enviar cifra</button>
          <button className="nav-link">Mais</button>
          <button className="login-button">Entrar</button>
        </div>
      </div>
    </header>
  )
}

export default Header
