import { useState, useEffect, useCallback } from "react";
import { FaBars, FaTimes, FaReact, FaJs, FaNode, FaBuilding, FaUniversity, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "./assets/logo.webp"; 
import profileImage from "./assets/mano.webp"; // Pakeičiam į tinkamą nuorodą į paveikslėlio failą
import axios from "axios";
import "./index.scss";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [works, setWorks] = useState([]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/works')
    .then((response) => {
      setWorks(response.data);
    })
    .catch((error) => {
      console.error('Klaida gaunant duomenis:', error);
    });
  }, []);

  return (
    <div>
      <header>
        <div className="logo-container">
          <img src={logo} alt="zigmasebdev logo" className="logo" loading="lazy" />
        </div>
        <nav className={isMenuOpen ? "open" : ""} aria-label="Main Navigation">
          <ul>
            <li>
              <a href="#home" onClick={closeMenu}>Pagrindinis</a>
            </li>
            <li>
              <a href="#about" onClick={closeMenu}>Apie mane</a>
            </li>
            <li>
              <a href="#works" onClick={closeMenu}>Mano darbai</a>
            </li>
            <li>
              <a href="#contacts" onClick={closeMenu}>Kontaktai</a>
            </li>
          </ul>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </header>

      
    </div>
  )
};

export default App;
