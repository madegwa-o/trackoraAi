import { useState } from 'react';
import styles from './DonationCard.module.css';
import { useWebSocket } from "../../hooks/WebSocketContext.jsx";

export function DonationCard() {
    const { sendDonation, message } = useWebSocket();
    const [donorName, setDonorName] = useState('');
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errors, setErrors] = useState({});

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Use the sendMoney function with the form data
            sendDonation({
                amount: Number(amount),
                phoneNumber: phoneNumber,
                senderName: donorName || 'Anonymous'
            });

            // Reset form after submission
            setDonorName('');
            setAmount('');
            setPhoneNumber('');
            setErrors({});
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
                    />
                    <small className={styles.helpText}>Must start with 0 and be exactly 10 digits</small>
                    {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
                </div>

                {message && (
                    <div className={styles.message}>
                        {message}
                    </div>
                )}

                <button type="submit" className="btn-primary">
                    Donate Now
                </button>
            </form>
        </div>
    );
}