
export class PaymentRepository {
    constructor() {
        // Initialize storage if needed
        if (!localStorage.getItem('payments')) {
            localStorage.setItem('payments', JSON.stringify([]));
        }
    }

    async save(payment) {
        try {
            // Generate ID if not provided
            if (!payment.paymentId) {
                payment.paymentId = this._generateId();
            }

            // Add timestamp if not present
            if (!payment.timestamp) {
                payment.timestamp = new Date().toISOString();
            }

            // Get current payments
            const payments = this._getAll();

            // Add new payment
            payments.push(payment);

            // Save back to storage
            localStorage.setItem('payments', JSON.stringify(payments));

            return payment;
        } catch (error) {
            console.error('Error saving payment:', error);
            throw new Error('Failed to save payment');
        }
    }

    async findById(id) {
        try {
            const payments = this._getAll();
            return payments.find(p => p.paymentId === id) || null;
        } catch (error) {
            console.error('Error finding payment by ID:', error);
            throw new Error('Failed to find payment');
        }
    }

    async findByUserId(userId) {
        try {
            const payments = this._getAll();
            return payments.filter(p => p.userId === userId);
        } catch (error) {
            console.error('Error finding payments by user ID:', error);
            throw new Error('Failed to find payments');
        }
    }

    async updateStatus(id, status, mpesaReceiptNumber = null, resultDesc = null) {
        try {
            const payments = this._getAll();
            const paymentIndex = payments.findIndex(p => p.paymentId === id);

            if (paymentIndex === -1) {
                throw new Error('Payment not found');
            }

            // Update the payment
            payments[paymentIndex] = {
                ...payments[paymentIndex],
                status,
                ...(mpesaReceiptNumber && { mpesaReceiptNumber }),
                ...(resultDesc && { resultDesc }),
                updatedAt: new Date().toISOString()
            };

            // Save back to storage
            localStorage.setItem('payments', JSON.stringify(payments));

            return payments[paymentIndex];
        } catch (error) {
            console.error('Error updating payment status:', error);
            throw new Error('Failed to update payment status');
        }
    }

    async findAll() {
        return this._getAll();
    }

    _getAll() {
        try {
            return JSON.parse(localStorage.getItem('payments')) || [];
        } catch (error) {
            console.error('Error parsing payments from storage:', error);
            return [];
        }
    }

    _generateId() {
        return 'pay-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    }
}

// Create singleton instance
const paymentRepository = new PaymentRepository();
export default paymentRepository;