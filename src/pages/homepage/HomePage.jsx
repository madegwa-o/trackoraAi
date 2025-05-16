import { Headphones, MessageSquare, BookOpen, UserPlus, Globe, Accessibility, Github, Twitter, Linkedin } from 'lucide-react';
import styles from './homePage.module.css';

export default function HomePage() {
    return (
        <main>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <span className={styles.trialBadge}>Free Trial Available</span>
                        <h1 className={styles.heroTitle}>University Education for All</h1>
                        <p className={styles.heroSubtitle}>
                            Trackora AI makes education accessible for the visually impaired through advanced text-to-speech and conversational AI technology.
                        </p>
                        <div className={styles.heroCta}>
                            <a href="#text-to-speech" className={`btn-primary ${styles.ctaButton}`}>
                                <Headphones size={18} />
                                Text to Speech
                            </a>
                            <a href="#conversation" className={`btn-secondary ${styles.ctaButton}`}>
                                <MessageSquare size={18} />
                                Conversational AI
                            </a>
                        </div>
                        <div className={styles.heroActions}>
                            <a href="#trial" className="btn-secondary">Start Free Trial</a>
                            <a href="#demo" className="btn-secondary">See Demo</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featureSection} id="features">
                <div className="container">
                    <h2>Accessible Learning Solutions</h2>
                    <div className={styles.featuresGrid}>
                        <div className={`card ${styles.featureCard}`}>
                            <div className={styles.featureIcon}>
                                <Headphones size={24} />
                            </div>
                            <h3 className={styles.featureTitle}>Advanced Text-to-Speech</h3>
                            <p className={styles.featureDescription}>
                                Convert any text into natural-sounding speech with our powerful 11Labs-powered text-to-speech engine, supporting multiple languages and voices.
                            </p>
                        </div>

                        <div className={`card ${styles.featureCard}`}>
                            <div className={styles.featureIcon}>
                                <MessageSquare size={24} />
                            </div>
                            <h3 className={styles.featureTitle}>Conversational Learning</h3>
                            <p className={styles.featureDescription}>
                                Engage with our AI assistant to discuss complex topics, ask questions, and receive immediate audio feedback for a truly interactive learning experience.
                            </p>
                        </div>

                        <div className={`card ${styles.featureCard}`}>
                            <div className={styles.featureIcon}>
                                <BookOpen size={24} />
                            </div>
                            <h3 className={styles.featureTitle}>University-Level Content</h3>
                            <p className={styles.featureDescription}>
                                Access comprehensive educational materials covering a wide range of university subjects and disciplines, all optimized for audio learning.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section className="container" id="text-to-speech">
                <div className={styles.demoSection}>
                    <div className={styles.demoTabs}>
                        <div className={`${styles.demoTab} ${styles.demoTabActive}`}>Text-to-Speech</div>
                        <div className={styles.demoTab} id="conversation">Conversational AI</div>
                    </div>
                    <div className={styles.demoContent}>
                        <div className="card">
                            <h3>Transform Text into Natural Speech</h3>
                            <p>Experience our powerful text-to-speech technology that converts written content into high-quality, natural-sounding audio.</p>
                            <div style={{ margin: '24px 0', padding: '20px', backgroundColor: 'var(--button-secondary-bg)', borderRadius: '8px' }}>
                                <p>Try it out by entering your text below:</p>
                                <textarea
                                    placeholder="Enter text to convert to speech..."
                                    rows="4"
                                    style={{ width: '100%', marginTop: '12px', marginBottom: '12px' }}
                                ></textarea>
                                <button className="btn-primary">Convert to Speech</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* More Features Section */}
            <section className={styles.featureSection}>
                <div className="container">
                    <h2>Why Choose Trackora AI?</h2>
                    <div className={styles.featuresGrid}>
                        <div className={`card ${styles.featureCard}`}>
                            <div className={styles.featureIcon}>
                                <Accessibility size={24} />
                            </div>
                            <h3 className={styles.featureTitle}>Inclusivity First</h3>
                            <p className={styles.featureDescription}>
                                Designed with accessibility at its core, ensuring education is available to everyone regardless of visual ability.
                            </p>
                        </div>

                        <div className={`card ${styles.featureCard}`}>
                            <div className={styles.featureIcon}>
                                <Globe size={24} />
                            </div>
                            <h3 className={styles.featureTitle}>Global Reach</h3>
                            <p className={styles.featureDescription}>
                                Support for multiple languages and accents to serve diverse student populations around the world.
                            </p>
                        </div>

                        <div className={`card ${styles.featureCard}`}>
                            <div className={styles.featureIcon}>
                                <UserPlus size={24} />
                            </div>
                            <h3 className={styles.featureTitle}>Growing Community</h3>
                            <p className={styles.featureDescription}>
                                Join thousands of students and educators already using Trackora AI to transform educational accessibility.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className={styles.testimonialSection} id="about">
                <div className="container">
                    <h2>What Students & Educators Say</h2>
                    <div className={styles.testimonialGrid}>
                        <div className={styles.testimonialCard}>
                            <div className={styles.testimonialContent}>
                                Trackora AI has completely transformed how I access my course materials. The natural-sounding voice makes learning enjoyable rather than a chore.
                            </div>
                            <div className={styles.testimonialAuthor}>Sarah M.</div>
                            <div className={styles.testimonialRole}>Computer Science Student</div>
                        </div>

                        <div className={styles.testimonialCard}>
                            <div className={styles.testimonialContent}>
                                As an educator, I've seen firsthand how Trackora AI has opened doors for my visually impaired students. The conversational AI feature is particularly impressive.
                            </div>
                            <div className={styles.testimonialAuthor}>Dr. James Wilson</div>
                            <div className={styles.testimonialRole}>Professor of Physics</div>
                        </div>

                        <div className={styles.testimonialCard}>
                            <div className={styles.testimonialContent}>
                                The quality of the voice synthesis is remarkable. For the first time, I feel like I have equal access to educational resources as my sighted peers.
                            </div>
                            <div className={styles.testimonialAuthor}>Michael T.</div>
                            <div className={styles.testimonialRole}>Graduate Student</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className={styles.callToActionSection} id="trial">
                <div className="container">
                    <div className={styles.callToActionContent}>
                        <h2 className={styles.callToActionTitle}>Start Your Accessible Learning Journey Today</h2>
                        <p className={styles.callToActionDescription}>
                            Sign up for a free trial and experience the power of Trackora AI's text-to-speech and conversational learning features.
                        </p>
                        <div>
                            <button className="btn-primary">Get Started</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className="container">
                    <div className={styles.footerGrid}>
                        <div>
                            <div className={styles.footerLogo}>
                                <div className={styles.footerLogoImg}>T</div>
                                <span>Trackora AI</span>
                            </div>
                            <p className={styles.footerDescription}>
                                Making university education accessible to everyone through AI-powered solutions.
                            </p>
                            <div className={styles.footerSocial}>
                                <a href="#" className={styles.footerLink} aria-label="Github">
                                    <Github size={20} />
                                </a>
                                <a href="#" className={styles.footerLink} aria-label="Twitter">
                                    <Twitter size={20} />
                                </a>
                                <a href="#" className={styles.footerLink} aria-label="LinkedIn">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className={styles.footerTitle}>Product</h3>
                            <div className={styles.footerLinks}>
                                <a href="#" className={styles.footerLink}>Text-to-Speech</a>
                                <a href="#" className={styles.footerLink}>Conversational AI</a>
                                <a href="#" className={styles.footerLink}>Pricing</a>
                                <a href="#" className={styles.footerLink}>Enterprise</a>
                            </div>
                        </div>

                        <div>
                            <h3 className={styles.footerTitle}>Resources</h3>
                            <div className={styles.footerLinks}>
                                <a href="#" className={styles.footerLink}>Documentation</a>
                                <a href="#" className={styles.footerLink}>Tutorials</a>
                                <a href="#" className={styles.footerLink}>Blog</a>
                                <a href="#" className={styles.footerLink}>Support</a>
                            </div>
                        </div>

                        <div>
                            <h3 className={styles.footerTitle}>Company</h3>
                            <div className={styles.footerLinks}>
                                <a href="#" className={styles.footerLink}>About Us</a>
                                <a href="#" className={styles.footerLink}>Careers</a>
                                <a href="#" className={styles.footerLink}>Contact</a>
                                <a href="#" className={styles.footerLink}>Accessibility</a>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <p>© {new Date().getFullYear()} Trackora AI. All rights reserved.</p>
                        <div className={styles.footerBottomLinks}>
                            <a href="#" className={styles.footerLink}>Privacy Policy</a>
                            <a href="#" className={styles.footerLink}>Terms of Service</a>
                            <a href="#" className={styles.footerLink}>Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}