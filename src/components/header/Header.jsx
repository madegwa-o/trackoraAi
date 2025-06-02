    import { Sun, Moon, MessageCircle, BellPlus, Menu, X } from 'lucide-react';
    import styles from './Header.module.css';
    import { useTheme } from '../../hooks/themeProvider';
    import { Link, useLocation } from 'react-router-dom';
    import { useState, useEffect } from 'react';

    export default function Header() {
        const { theme, toggleTheme } = useTheme();
        const location = useLocation();
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

        // Close mobile menu when route changes
        useEffect(() => {
            setIsMobileMenuOpen(false);
        }, [location.pathname]);

        // Close mobile menu when clicking outside or pressing escape
        useEffect(() => {
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    setIsMobileMenuOpen(false);
                }
            };

            const handleClickOutside = (e) => {
                if (isMobileMenuOpen && !e.target.closest(`.${styles.header}`) && !e.target.closest(`.${styles.mobileNav}`)) {
                    setIsMobileMenuOpen(false);
                }
            };

            if (isMobileMenuOpen) {
                document.addEventListener('keydown', handleEscape);
                document.addEventListener('click', handleClickOutside);
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }

            return () => {
                document.removeEventListener('keydown', handleEscape);
                document.removeEventListener('click', handleClickOutside);
                document.body.style.overflow = 'unset';
            };
        }, [isMobileMenuOpen]);

        const toggleMobileMenu = () => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
        };

        const isActiveRoute = (path) => {
            if (path === '/') {
                return location.pathname === '/';
            }
            return location.pathname.startsWith(path);
        };

        const navItems = [
            { path: '/', label: 'Home', exact: true },
            { path: '/docs', label: 'Docs' },
            { path: '/donate', label: 'Donate' },
            { path: '/converse', label: 'Conversation AI' },
            { path: '/text-to-speech', label: 'Text to Speech' },
        ];

        return (
            <>
                <header className={styles.header}>
                    <div className={`container ${styles.headerContainer}`}>
                        <div className={styles.logo}>
                            <Link to="/" className={styles.logoLink}>
                                <div className={styles.logoImg}>T</div>
                                <span className={styles.logoText}>Trackora AI</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className={styles.nav}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    className={`${styles.navLink} ${
                                        isActiveRoute(item.path) ? styles.navLinkActive : ''
                                    }`}
                                    to={item.path}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className={styles.actions}>
                            <button
                                onClick={toggleTheme}
                                className={styles.iconButton}
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button className={styles.iconButton} aria-label="Messages">
                                <MessageCircle size={20} />
                            </button>
                            <button className={styles.iconButton} aria-label="Notifications">
                                <BellPlus size={20} />
                            </button>
                            <button className={`btn-primary ${styles.signInButton}`}>
                                Sign In
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                className={`${styles.iconButton} ${styles.mobileMenuButton}`}
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                &#9776;
                            </button>
                        </div>
                    </div>
                </header>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className={styles.mobileMenuOverlay}
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Mobile Navigation Menu */}
                <nav className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ''}`}>
                    {/* Mobile Menu Toggle */}
                    <button
                        className={`${styles.iconButton} ${styles.mobileMenuButton}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        x
                    </button>
                    <div className={styles.mobileNavContent}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                className={`${styles.mobileNavLink} ${
                                    isActiveRoute(item.path) ? styles.mobileNavLinkActive : ''
                                }`}
                                to={item.path}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Mobile Actions */}
                        <div className={styles.mobileActions}>
                            <button className="btn-primary">Sign In</button>
                        </div>
                    </div>
                </nav>
            </>
        );
    }