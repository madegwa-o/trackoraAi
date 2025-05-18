// PaymentPage.jsx
import { useState } from 'react';
import PaymentForm from '../components/PaymentForm.jsx';
import './PaymentPage.css';

function PaymentPage() {
    const [showHistory, setShowHistory] = useState(false);

    // Mock payment history data (in a real app, you would fetch this)
    const mockPaymentHistory = [
        {
            id: 'pay123',
            amount: 1500,
            phoneNumber: '254712345678',
            status: 'COMPLETED',
            timestamp: '2023-09-15T10:30:45Z',
            mpesaReceiptNumber: 'MPR123456789'
        },
        {
            id: 'pay124',
            amount: 2000,
            phoneNumber: '254723456789',
            status: 'PENDING',
            timestamp: '2023-09-14T14:22:18Z'
        }
    ];

    return (
        <div className="page-container">
            <h1 className="page-title">Payment Portal</h1>

            <div className="tab-buttons">
                <button
                    onClick={() => setShowHistory(false)}
                    className={`tab-button ${!showHistory ? 'tab-active' : ''}`}
                >
                    Make Payment
                </button>
                <button
                    onClick={() => setShowHistory(true)}
                    className={`tab-button ${showHistory ? 'tab-active' : ''}`}
                >
                    Payment History
                </button>
            </div>

            {!showHistory ? (
                <PaymentForm />
            ) : (
                <div className="history-container">
                    <h2 className="history-title">Your Payment History</h2>

                    {mockPaymentHistory.length > 0 ? (
                        <div className="table-container">
                            <table className="payment-table">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Receipt</th>
                                </tr>
                                </thead>
                                <tbody>
                                {mockPaymentHistory.map((payment) => (
                                    <tr key={payment.id} className="table-row">
                                        <td>
                                            {new Date(payment.timestamp).toLocaleDateString()}
                                        </td>
                                        <td>KES {payment.amount}</td>
                                        <td>{payment.phoneNumber}</td>
                                        <td>
                                            <span
                                                className={`status-badge ${
                                                    payment.status === 'COMPLETED'
                                                        ? 'status-completed'
                                                        : 'status-pending'
                                                }`}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td>
                                            {payment.mpesaReceiptNumber || '-'}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="no-data">No payment history found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default PaymentPage;