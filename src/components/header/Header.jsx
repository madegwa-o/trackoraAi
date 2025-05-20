
import { Sun, Moon, MessageCircle, BellPlus, Menu } from 'lucide-react';
import styles from './Header.module.css';
import { useTheme } from '../../hooks/themeProvider';
import {Link } from 'react-router-dom';

export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                <div className={styles.logo}>
                    {/* Use a placeholder for the logo */}
                    <div className={styles.logoImg} style={{ backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>T</div>
                    <span className={styles.logoText}>Trackora AI</span>
                </div>

                <nav className={styles.nav}>
                    <Link className={`${styles.navLink} ${styles.navLinkActive}`}to="/">Home</Link>

                    <Link className={styles.navLink}  to="/converse">Conversation ai</Link>
                    <Link className={styles.navLink}  to="/text-to-speech">Text to Speach</Link>
                    <Link className={styles.navLink}  to="/about">About Us</Link>
                    <Link className={styles.navLink}  to="/docs">Docs</Link>
                </nav>

                <div className={styles.actions}>
                    <button onClick={toggleTheme} className={styles.iconButton} aria-label="Toggle theme">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button className={styles.iconButton} aria-label="Messages">
                        <MessageCircle size={20} />
                    </button>
                    <button className={styles.iconButton} aria-label="Notifications">
                        <BellPlus size={20} />
                    </button>
                    <button className={`btn-primary ${styles.mobileMenuButton}`}>Sign In</button>
                    <button className={styles.iconButton + ' mobile-only'} aria-label="Menu">
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}