import { useState } from 'react';
import styles from './DonationCard.module.css';
import axiosInstance from "../../utils/axiosInstance.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

export function DonationCard() {
    const [donorName, setDonorName] = useState('');
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
                const response = await axiosInstance.post('/donation/initiate',
                    donationRequest,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );

                console.log('response: ', response);
                setMessage('Donation submitted successfully!');

                // Reset form after successful submission
                setDonorName('');
                setAmount('');
                setPhoneNumber('');
                setErrors({});
            } catch(err) {
                console.log(err);
                setMessage('Error submitting donation. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="card">
            <h1>Make Donation</h1>
            <form onSubmit={handleSubmit} className={styles.donationForm}>
                <div className={styles.formGroup}>
                    <label htmlFor="donorName">Donor Name (Optional)</label>
                    <input
                        type="text"
                        id="donorName"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Anonymous"
                        disabled={isLoading}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="amount">Amount *</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter donation amount"
                        min="1"
                        step="0.01"
                        required
                        disabled={isLoading}
                    />
                    {errors.amount && <span className={styles.error}>{errors.amount}</span>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">Phone Number *</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="0123456789"
                        pattern="^0\d{9}$"
                        maxLength="10"
                        required
                        disabled={isLoading}
                    />
                    <small className={styles.helpText}>Must start with 0 and be exactly 10 digits</small>
                    {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
                </div>

                {message && (
                    <div className={`${styles.message} ${message.includes('Error') ? styles.errorMessage : styles.successMessage}`}>
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
                            <span className={styles.buttonText}>Processing...</span>
                        </>
                    ) : (
                        'Donate Now'
                    )}
                </button>
            </form>
        </div>
    );
}