import { useState, useEffect, useCallback } from "react";
import { FaBars, FaTimes, FaReact, FaJs, FaNode, FaBuilding, FaUniversity, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "./assets/logo.webp"; 
import profileImage from "./assets/mano.webp"; // Pakeičiam į tinkamą nuorodą į paveikslėlio failą
import axios from "axios";
import "./index.scss";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [works, setWorks] = useState([]);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:3000/works')
      .then((response) => {
        setWorks(response.data);
      })
      .catch((error) => {
        console.error('Klaida gaunant darbus:', error);
      });
  }, []);
  
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);


  return (
    <div>
      <header>
        <div className="logo-container">
          <img src={logo} alt="Zigmaswebdev Logo" className="logo" loading="lazy" />
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

      <section id="home" className="hero">
        <h1>Sveiki atvykę į ZigmasWebDev.lt</h1>
        <p>Kuriu modernias svetaines ir programas</p>
      </section>

      <section id="about" className="about-container">
        <div className="profile-container">
          <img src={profileImage} alt="Profilio nuotrauka" className="profile-image" />
        </div>
        <div className="about-text">
          <div className="content">
            <p>Sveiki! Esu <span className="highlight">Zigmas</span>, specializuojantis frontend (
              <span className="icon-text">
                <FaReact className="icon" color="#61DBFB" /> React,
              </span>
              <span className="icon-text">
                <FaJs className="icon" color="#F0DB4F" /> JavaScript
              </span>) ir backend (
              <span className="icon-text">
                <FaNode className="icon" color="#68A063" /> Node.js
              </span>) technologijose.</p>
            <p>Mano tikslas yra suteikti jums puikų interneto svetainių ir programų patyrimą, atitinkantį jūsų poreikius ir viršijantį jūsų lūkesčius. Esu pasirengęs įgyvendinti jūsų idėjas nuo pradžios iki pabaigos, siekdamas užtikrinti, kad jūsų projektas būtų sėkmingas.</p>
            <p>Šiuo metu esu freelancer, todėl turėčiau galimybę dirbti su jumis tiesiogiai ir suteikti jums asmeninį dėmesį jūsų projektui. Nepaisant to, kad esu pradedantysis, esu labai motyvuotas tobulėti ir teikti aukščiausio lygio paslaugas savo klientams.</p>
            <p>Jei turite klausimų ar norite aptarti savo projektą, nedvejokite susisiekti su manimi. Būsiu labai dėkingas galimybei bendradarbiauti ir padėti jums pasiekti jūsų tikslus.</p>
            <p>Dėkoju už dėmesį ir laukiu galimybės dirbti su jumis!</p>
            <p>Su pagarba,</p>
            <p><span className="highlight">Zigmas</span></p>
          </div>
        </div>
      </section>

      <section id="works" className="works-container">
        <h2>Mano darbai</h2>
        <p>Informacija rengiama</p>
        <div className="work-items">
          {works.map((work) => (
            <div key={work.id} className="workItem">
              <div className="workItemContainer">
                <img src={`http://127.0.0.1:3000/uploads/${work.photo}`} alt={work.title} className="workPhoto" loading="lazy" />
                <p className="workTitle">{work.title}</p>
                <p className="workDescription">{work.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contacts" className="contacts-container">
        <h2>Kontaktai</h2>
        <div className="contact-info">
          <div className="contact-item">
            <FaBuilding className="icon" />
            <div>
              <span>Zigmas Petrauskas</span>
              <span>IDV pažymos kodas: 1269609</span>
            </div>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="icon" />
            <div>
              <span>Adresas: Kruojos g. 8-56, Pakruojis, Lietuva</span>
            </div>
          </div>
          <div className="contact-item">
            <FaUniversity className="icon" />
            <div>
              <span>Banko sąskaitos nr.: LT737300010097043750, Swedbank</span>
            </div>
          </div>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <div>
              <span>El. paštas: zigmas.1@gmail.com</span>
            </div>
          </div>
          <div className="contact-item">
            <FaPhone className="icon" />
            <div>
              <span>Tel. nr.: +37060627573</span>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="footer-container">
        <p>&copy; 2024 Zigmas Petrauskas. Visos teisės saugomos.</p>
      </footer>
    </div>
  );
};

export default App;