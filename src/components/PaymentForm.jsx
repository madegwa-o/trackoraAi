// PaymentForm.jsx
import { useState } from 'react';
import { usePaymentService } from '../services/PaymentService.js';
import './PaymentForm.css';

const PaymentForm = ({ userId = "user123" }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const { paymentStatus, initiatePayment } = usePaymentService();
    const [formError, setFormError] = useState('');

    const validatePhoneNumber = (phone) => {
        // Basic Kenyan phone number validation
        return phone
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormError('');

        // Form validation
        if (!phoneNumber || !amount) {
            setFormError('Please fill in all required fields');
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            setFormError('Please enter a valid phone number');
            return;
        }


        try {
            // Format phone number to include country code if needed
            let formattedPhone = phoneNumber;
            if (formattedPhone.startsWith('254')) {
                formattedPhone = '0' + formattedPhone.substring(1);
            }

            // Initiate the payment
            await initiatePayment(amount, formattedPhone);
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };

    return (
        <div className="payment-container">
            <h2 className="payment-title">Make Payment</h2>

            {formError && (
                <div className="error-message">
                    {formError}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="phoneNumber" className="form-label">
                        Phone Number (M-Pesa)
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. 0712345678"
                        className="form-input"
                        disabled={paymentStatus.loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount" className="form-label">
                        Amount (KES)
                    </label>
                    <input
                        type="text"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="form-input"
                        disabled={paymentStatus.loading}
                    />
                </div>

                <button
                    type="submit"
                    className={`payment-button ${paymentStatus.loading ? 'button-disabled' : ''}`}
                    disabled={paymentStatus.loading}
                >
                    {paymentStatus.loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>

            {paymentStatus.success && (
                <div className="success-message">
                    <h3 className="message-title">Payment Initiated Successfully!</h3>
                    <p>Reference: {paymentStatus.reference}</p>
                    <p>Checkout ID: {paymentStatus.checkoutRequestID}</p>
                    <p className="message-note">
                        Please check your phone and complete the payment.
                    </p>
                </div>
            )}

            {paymentStatus.error && (
                <div className="error-message">
                    <h3 className="message-title">Payment Failed</h3>
                    <p>{paymentStatus.error}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;
