import { useState } from 'react';
import styles from './DonationCard.module.css';
import axiosInstance from "../../utils/axiosInstance.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

export function DonationCard({ refreshDonorList }) {
    const [donorName, setDonorName] = useState('');
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const quickAmounts = [50,100, 500, 1000, 2500, 5000];

    const validateForm = () => {
        const newErrors = {};

        // Validate amount
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            newErrors.amount = 'Please enter a valid amount greater than 0';
        }

        // Validate phone number
        if (!phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^0\d{9}$/.test(phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must start with 0 and be exactly 10 digits';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleQuickAmount = (quickAmount) => {
        setAmount(quickAmount.toString());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsLoading(true);
            setMessage('');

            const donationRequest = {
                amount: Number(amount),
                phoneNumber: phoneNumber,
                senderName: donorName || 'Anonymous',
                externalReference: `INV-${new Date().toISOString().replace(/[-:.T]/g, '').slice(0, 17)}`,
            };

            try {
                const response = await axiosInstance.post('/donation/initiate', donationRequest, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                console.log('response: ', response);

                if (response.data.success) {
                    setMessage('🎉 Thank you for your amazing generosity! Your donation is being processed.');

                    // Reset form after successful submission
                    setDonorName('');
                    setAmount('');
                    setPhoneNumber('');
                    setErrors({});

                    // Set a timeout to refresh the donor list after 3 seconds
                    setTimeout(() => {
                        refreshDonorList();
                    }, 3000);
                }
            } catch (err) {
                console.log(err);
                setMessage('⚠️ Something went wrong. Please try again or contact support.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="card">
            <div className={styles.cardHeader}>
                <h1 className={styles.cardTitle}>🎁 Make Your Impact</h1>
                <p className={styles.cardSubtitle}>
                    Transform lives with your kindness. Every shilling counts towards creating positive change.
                </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.donationForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="donorName" className={styles.formLabel}>
                        <span className={styles.labelIcon}>👤</span>
                        Your Name (Optional)
                    </label>
                    <input
                        type="text"
                        id="donorName"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Enter your name or stay anonymous"
                        disabled={isLoading}
                        className={styles.formInput}
                    />
                    <small className={styles.helpText}>
                        Leave blank to donate anonymously
                    </small>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="amount" className={styles.formLabel}>
                        <span className={styles.labelIcon}>💰</span>
                        Donation Amount *
                    </label>

                    {/* Quick Amount Buttons */}
                    <div className={styles.quickAmounts}>
                        {quickAmounts.map((quickAmount) => (
                            <button
                                key={quickAmount}
                                type="button"
                                onClick={() => handleQuickAmount(quickAmount)}
                                className={`${styles.quickAmountBtn} ${
                                    amount === quickAmount.toString() ? styles.active : ''
                                }`}
                                disabled={isLoading}
                            >
                                sh {quickAmount.toLocaleString()}
                            </button>
                        ))}
                    </div>

                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter custom amount (any amount you wish)"
                        min="10"
                        step="1"
                        required
                        disabled={isLoading}
                        className={styles.formInput}
                    />
                    {errors.amount && <span className={styles.error}>{errors.amount}</span>}
                    <small className={styles.helpText}>
                        ✨ No amount is too small - every contribution matters!
                    </small>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber" className={styles.formLabel}>
                        <span className={styles.labelIcon}>📱</span>
                        M-Pesa Phone Number *
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="0712345678"
                        pattern="^0\d{9}$"
                        maxLength="10"
                        required
                        disabled={isLoading}
                        className={styles.formInput}
                    />
                    <small className={styles.helpText}>
                        We'll send you an M-Pesa payment request
                    </small>
                    {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
                </div>

                {message && (
                    <div className={`${styles.message} ${message.includes('⚠️') ? styles.errorMessage : styles.successMessage}`}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    className={`btn-primary ${styles.submitButton}`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinner />
                            <span className={styles.buttonText}>Processing your kindness...</span>
                        </>
                    ) : (
                        <>
                            <span className={styles.buttonIcon}>🚀</span>
                            <span className={styles.buttonText}>Donate Now & Make Impact</span>
                        </>
                    )}
                </button>

                <div className={styles.securityNote}>
                    <span className={styles.securityIcon}>🔐</span>
                    <span>Your payment is secured with end-to-end encryption</span>
                </div>
            </form>
        </div>
    );
}