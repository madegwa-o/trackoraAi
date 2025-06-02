import { Headphones, MessageSquare, BookOpen, UserPlus, Globe, Accessibility, Github, Twitter, Linkedin, Share2, Heart, Code } from 'lucide-react';
import styles from './HomePage.module.css';
import {Link} from 'react-router-dom';
import DemoSection from "./demo/DemoSection.jsx";

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
                            <Link to="/text-to-speech" className={`btn-primary ${styles.ctaButton}`}>
                                <Headphones size={18} />
                                Text to Speech
                            </Link>
                            <Link to="/conversation" className={`btn-secondary ${styles.ctaButton}`}>
                                <MessageSquare size={18} />
                                Conversational AI
                            </Link>
                        </div>
                        <div className={styles.heroActions}>
                            <a href="#contribute" className={`btn-secondary ${styles.ctaButton}`}>Contribute To Us</a>
                            <a href="#text-to-speech" className={`btn-primary ${styles.ctaButton}`}>See Demo</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.featureSection} id="features">
                <div className="container">
                    <div className={styles.contributionHeader}>
                        <h2 className={styles.contributionTitle}>Accessible Learning Solutions</h2>
                        <p className={styles.contributionSubtitle}>
                            Powerful AI-driven tools designed to transform the educational experience for visually impaired students worldwide.
                        </p>
                    </div>
                    <div className={styles.contributionGrid}>
                        <div className={styles.contributionCard}>
                            <div className={styles.contributionIcon}>
                                <Headphones size={32} />
                            </div>
                            <h3 className={styles.contributionCardTitle}>Advanced Text-to-Speech</h3>
                            <p className={styles.contributionCardDescription}>
                                Convert any text into natural-sounding speech with our powerful 11Labs-powered text-to-speech engine, supporting multiple languages and voices.
                            </p>
                            <div className={styles.contributionCardAction}>
                                Try Now →
                            </div>
                        </div>

                        <div className={styles.contributionCard}>
                            <div className={styles.contributionIcon}>
                                <MessageSquare size={32} />
                            </div>
                            <h3 className={styles.contributionCardTitle}>Conversational Learning</h3>
                            <p className={styles.contributionCardDescription}>
                                Engage with our AI assistant to discuss complex topics, ask questions, and receive immediate audio feedback for a truly interactive learning experience.
                            </p>
                            <div className={styles.contributionCardAction}>
                                Start Conversation →
                            </div>
                        </div>

                        <div className={styles.contributionCard}>
                            <div className={styles.contributionIcon}>
                                <BookOpen size={32} />
                            </div>
                            <h3 className={styles.contributionCardTitle}>University-Level Content</h3>
                            <p className={styles.contributionCardDescription}>
                                Access comprehensive educational materials covering a wide range of university subjects and disciplines, all optimized for audio learning.
                            </p>
                            <div className={styles.contributionCardAction}>
                                Explore Content →
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demo Section */}
            <section className="container" id="text-to-speech">
               <DemoSection />
            </section>

            {/* Why us Section */}
            <section className={styles.featureSection}>
                <div className="container">
                    <div className={styles.contributionHeader}>
                        <h2 className={styles.contributionTitle}>Why Choose Trackora AI?</h2>
                        <p className={styles.contributionSubtitle}>
                            Built with cutting-edge technology and a commitment to accessibility, we're transforming how education reaches everyone.
                        </p>
                    </div>
                    <div className={styles.contributionGrid}>
                        <div className={styles.contributionCard}>
                            <div className={styles.contributionIcon}>
                                <Accessibility size={32} />
                            </div>
                            <h3 className={styles.contributionCardTitle}>Inclusivity First</h3>
                            <p className={styles.contributionCardDescription}>
                                Designed with accessibility at its core, ensuring education is available to everyone regardless of visual ability.
                            </p>
                            <div className={styles.contributionCardAction}>
                                Learn More →
                            </div>
                        </div>

                        <div className={styles.contributionCard}>
                            <div className={styles.contributionIcon}>
                                <Globe size={32} />
                            </div>
                            <h3 className={styles.contributionCardTitle}>Global Reach</h3>
                            <p className={styles.contributionCardDescription}>
                                Support for multiple languages and accents to serve diverse student populations around the world.
                            </p>
                            <div className={styles.contributionCardAction}>
                                View Languages →
                            </div>
                        </div>

                        <div className={styles.contributionCard}>
                            <div className={styles.contributionIcon}>
                                <UserPlus size={32} />
                            </div>
                            <h3 className={styles.contributionCardTitle}>Growing Community</h3>
                            <p className={styles.contributionCardDescription}>
                                Join thousands of students and educators already using Trackora AI to transform educational accessibility.
                            </p>
                            <div className={styles.contributionCardAction}>
                                Join Community →
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contribution Section */}
            <section className={styles.contributionSection} id="contribute">
                <div className="container">
                    <div className={styles.contributionHeader}>
                        <h2 className={styles.contributionTitle}>Join Our Mission</h2>
                        <p className={styles.contributionSubtitle}>
                            Help us make education accessible to everyone. There are many ways you can contribute to our cause.
                        </p>
                    </div>
                    <div className={styles.contributionGrid}>
                        <Link to="/share" className={styles.contributionCard}>
                            <div className={styles.contributionIcon}>
                                <Share2 size={32} />
                            </div>
                            <h3 className={styles.contributionCardTitle}>Share Our Mission</h3>
                            <p className={styles.contributionCardDescription}>
                                Spread awareness by sharing our platform on social media and help us reach more students who need accessible education.
                            </p>
                            <div className={styles.contributionCardAction}>
                                Share Now →
                            </div>
                        </Link>

                        <Link to="/donate" className={styles.contributionCard}>
                            <div className={styles.contributionIcon}>
                                <Heart size={32} />
                            </div>
                            <h3 className={styles.contributionCardTitle}>Support Us</h3>
                            <p className={styles.contributionCardDescription}>
                                Make a donation to help us improve our technology and provide free access to students in need.
                            </p>
                            <div className={styles.contributionCardAction}>
                                Donate Now →
                            </div>
                        </Link>

                        <Link to="/contribute-code" className={styles.contributionCard}>
                            <div className={styles.contributionIcon}>
                                <Code size={32} />
                            </div>
                            <h3 className={styles.contributionCardTitle}>Code With Us</h3>
                            <p className={styles.contributionCardDescription}>
                                Join our open-source community and help us build better accessibility features for students worldwide.
                            </p>
                            <div className={styles.contributionCardAction}>
                                View Repository →
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className={styles.testimonialSection} id="about">
                <div className="container">
                    <div className={styles.contributionHeader}>
                        <h2 className={styles.contributionTitle}>What Students & Educators Say</h2>
                        <p className={styles.contributionSubtitle}>
                            Real experiences from our community of learners and educators who are transforming accessibility in education.
                        </p>
                    </div>
                    <div className={styles.contributionGrid}>
                        <div className={styles.testimonialCardModern}>
                            <div className={styles.testimonialQuote}>"</div>
                            <div className={styles.testimonialContentModern}>
                                Trackora AI has completely transformed how I access my course materials. The natural-sounding voice makes learning enjoyable rather than a chore.
                            </div>
                            <div className={styles.testimonialAuthorSection}>
                                <div className={styles.testimonialAuthor}>Sarah M.</div>
                                <div className={styles.testimonialRole}>Computer Science Student</div>
                            </div>
                        </div>

                        <div className={styles.testimonialCardModern}>
                            <div className={styles.testimonialQuote}>"</div>
                            <div className={styles.testimonialContentModern}>
                                As an educator, I've seen firsthand how Trackora AI has opened doors for my visually impaired students. The conversational AI feature is particularly impressive.
                            </div>
                            <div className={styles.testimonialAuthorSection}>
                                <div className={styles.testimonialAuthor}>Dr. James Wilson</div>
                                <div className={styles.testimonialRole}>Professor of Physics</div>
                            </div>
                        </div>

                        <div className={styles.testimonialCardModern}>
                            <div className={styles.testimonialQuote}>"</div>
                            <div className={styles.testimonialContentModern}>
                                The quality of the voice synthesis is remarkable. For the first time, I feel like I have equal access to educational resources as my sighted peers.
                            </div>
                            <div className={styles.testimonialAuthorSection}>
                                <div className={styles.testimonialAuthor}>Michael T.</div>
                                <div className={styles.testimonialRole}>Graduate Student</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className={styles.callToActionSection} id="newsletter">
                <div className="container">
                    <div className={styles.callToActionContent}>
                        <h2 className={styles.callToActionTitle}>Stay Updated on Accessibility Innovation</h2>
                        <p className={styles.callToActionDescription}>
                            Join our community and be the first to know about new features, accessibility insights, and educational resources that are transforming how students learn.
                        </p>
                        <div className={styles.emailSignupForm}>
                            <div className={styles.emailInputWrapper}>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className={styles.emailInput}
                                />
                                <button className={`btn-primary ${styles.signupButton}`}>
                                    Join Our Community
                                </button>
                            </div>
                            <p className={styles.privacyText}>
                                We respect your privacy. Unsubscribe at any time.
                            </p>
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
                                <Link to="/github" className={styles.footerLink} aria-label="Github">
                                    <Github size={20} />
                                </Link>
                                <Link to="/twitter" className={styles.footerLink} aria-label="Twitter">
                                    <Twitter size={20} />
                                </Link>
                                <Link to="/linkedin" className={styles.footerLink} aria-label="LinkedIn">
                                    <Linkedin size={20} />
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className={styles.footerTitle}>Product</h3>
                            <div className={styles.footerLinks}>
                                <Link to="/text-to-speech" className={styles.footerLink}>Text-to-Speech</Link>
                                <Link to="/conversational-ai" className={styles.footerLink}>Conversational AI</Link>
                                <Link to="/pricing" className={styles.footerLink}>Pricing</Link>
                                <Link to="/enterprise" className={styles.footerLink}>Enterprise</Link>
                            </div>
                        </div>

                        <div>
                            <h3 className={styles.footerTitle}>Resources</h3>
                            <div className={styles.footerLinks}>
                                <Link to="/documentation" className={styles.footerLink}>Documentation</Link>
                                <Link to="/tutorials" className={styles.footerLink}>Tutorials</Link>
                                <Link to="/blog" className={styles.footerLink}>Blog</Link>
                                <Link to="/support" className={styles.footerLink}>Support</Link>
                            </div>
                        </div>

                        <div>
                            <h3 className={styles.footerTitle}>Company</h3>
                            <div className={styles.footerLinks}>
                                <Link to="/about" className={styles.footerLink}>About Us</Link>
                                <Link to="/careers" className={styles.footerLink}>Careers</Link>
                                <Link to="/contact" className={styles.footerLink}>Contact</Link>
                                <Link to="/accessibility" className={styles.footerLink}>Accessibility</Link>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <p>© {new Date().getFullYear()} Trackora AI. All rights reserved.</p>
                        <div className={styles.footerBottomLinks}>
                            <Link to="/privacy" className={styles.footerLink}>Privacy Policy</Link>
                            <Link to="/terms" className={styles.footerLink}>Terms of Service</Link>
                            <Link to="/cookies" className={styles.footerLink}>Cookie Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}