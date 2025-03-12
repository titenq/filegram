import { Link } from 'react-router-dom';

import styles from '@/components/Header/Header.module.css';
import logo from '@/assets/filegram.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <img
        src={logo}
        width={64}
        height={50}
        className={styles.logo_header}
        alt="Filegram logo"
      />

      <nav className={styles.navbar}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/arquivos" className={styles.link}>Arquivos</Link>
        <Link to="/upload" className={styles.link}>Upload</Link>
      </nav>
    </header>
  );
};

export default Header;
