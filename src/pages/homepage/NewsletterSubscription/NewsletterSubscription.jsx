import { useState } from 'react';
import styles from "./NewsletterSubscription.module.css";
import axiosInstance from "../../../utils/axiosInstance.jsx";

export default function NewsletterSubscription() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset status
        setStatus('');
        setIsSuccess(false);

        // Validate email
        if (!email.trim()) {
            setStatus('Please enter your email address.');
            return;
        }

        if (!validateEmail(email)) {
            setStatus('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axiosInstance.post('/subscribers/add', {
                email: email
            });

            if (response.status === 200) {
                setStatus('🎉 Thank you for subscribing! Welcome to our community.');
                setIsSuccess(true);
                setEmail('');
            } else {
                setStatus('Failed to subscribe. Please try again.');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            if (error.response?.status === 400) {
                setStatus('This email is already subscribed or invalid.');
            } else {
                setStatus('An error occurred. Please try again.');

            }
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setStatus('')

            },4000)
        }
    };

    return (
        <div className={styles.callToActionContent}>
            <h2 className={styles.callToActionTitle}>Stay Updated on Accessibility Innovation</h2>
            <p className={styles.callToActionDescription}>
                Join our community and be the first to know about new features, accessibility insights, and educational resources that are transforming how students learn.
            </p>

            <form onSubmit={handleSubmit} className={styles.emailSignupForm}>
                <div className={styles.emailInputWrapper}>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className={`${styles.emailInput} ${status && !isSuccess ? styles.errorInput : ''}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        aria-label="Email address"
                        required
                    />
                    <button
                        type="submit"
                        className={`btn-primary ${styles.signupButton} ${isLoading ? styles.loadingButton : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className={styles.spinner}></span>
                                Subscribing...
                            </>
                        ) : (
                            'Join Our Community'
                        )}
                    </button>
                </div>

                {status && (
                    <div className={`${styles.statusMessage} ${isSuccess ? styles.successMessage : styles.errorMessage}`}>
                        {status}
                    </div>
                )}

                <p className={styles.privacyText}>
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </form>
        </div>
    );
}