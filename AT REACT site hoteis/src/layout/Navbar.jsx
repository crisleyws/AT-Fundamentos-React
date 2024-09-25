import { Link } from "react-router-dom";
import Container from "./Container";
import styles from './css/navbar.module.css';
import { useState } from 'react';

function Navbar() {
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive(!active);
  };

  return (
    <div className={styles.navbar_container}>
      <nav className={styles.navbar}>
        <Container>
          <Link to="/" className={styles.logo}>
            <h1>Hoteis.com</h1>
          </Link>
          <div className={styles.menu_toggle} onClick={toggleMenu}>
            <div className={`${styles.bar} ${active ? styles.active : ''}`}></div>
            <div className={`${styles.bar} ${active ? styles.active : ''}`}></div>
            <div className={`${styles.bar} ${active ? styles.active : ''}`}></div>
          </div>
          <ul className={`${styles.navbar_ul} ${active ? styles.active : ''}`}>
            <li className={styles.navbar_li}><Link to="/">Home</Link></li>
            <li className={styles.navbar_li}><Link to="/HotelPage">Hoteis</Link></li>
            <li className={styles.navbar_li}><Link to="/admin">Admin</Link></li>
          </ul>
        </Container>
      </nav>
    </div>
  );
}

export default Navbar;
