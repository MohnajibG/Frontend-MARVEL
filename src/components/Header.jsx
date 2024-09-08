import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = ({ search, setSearch }) => {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="Logo MARVEL" />
      </Link>

      <input
        type="text"
        placeholder="Trouvez Votre Personnage"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <nav>
        <Link to="/characters">
          <button>Characters</button>
        </Link>
        <Link to="/comics">
          <button>Comics</button>
        </Link>
        <Link to="/favorites">
          <button>Favoris</button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
