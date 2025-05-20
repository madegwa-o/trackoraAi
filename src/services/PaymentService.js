
// Updated PaymentService.js with repository integration
import { useState } from 'react';
import paymentRepository from './PaymentRepository';

// Simulate PayHero payment service with local storage as DB
export const usePaymentService = () => {
    const [paymentStatus, setPaymentStatus] = useState({
        loading: false,
        success: false,
        error: null,
        reference: null,
        checkoutRequestID: null
    });

    const PAYMENT_CONFIG = {
        apiUrl: "https://backend.payhero.co.ke/api/v2/payments",
        channelId: 2175,
        provider: "m-pesa",
        callbackUrl: "https://your-app-domain.com/api/payment-callback"
    };

    // Simulate API call to PayHero
    const initiatePayment = async (amount, phoneNumber) => {
        try {
            setPaymentStatus({
                loading: true,
                success: false,
                error: null,
                reference: null,
                checkoutRequestID: null
            });

            // Create payment record
            const paymentData = {
                amount: amount,
                phoneNumber: phoneNumber,
                externalReference: `INV-${Date.now().toString().slice(-6)}`,
                status: "PENDING",
            };

            console.log("Initiating payment:", paymentData);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate successful PayHero API response
            const simulatedResponse = {
                success: true,
                status: "PENDING",
                reference: `REF${Math.floor(100000 + Math.random() * 900000)}`,
                CheckoutRequestID: `CK${Date.now().toString(36).slice(-8).toUpperCase()}`
            };

            // Update payment data with response details
            const updatedPayment = {
                ...paymentData,
                paymentId: simulatedResponse.reference,
                checkoutRequestID: simulatedResponse.CheckoutRequestID
            };

            // Save to repository (simulated MongoDB)
            await paymentRepository.save(updatedPayment);
            console.log("Payment record saved:", updatedPayment);

            // Update state with success
            setPaymentStatus({
                loading: false,
                success: true,
                error: null,
                reference: simulatedResponse.reference,
                checkoutRequestID: simulatedResponse.CheckoutRequestID
            });

            // Simulate a callback after a few seconds (this would normally come from the payment provider)
            simulateCallback(simulatedResponse.CheckoutRequestID, updatedPayment);

            return simulatedResponse;
        } catch (error) {
            console.error("Payment initiation failed:", error);

            setPaymentStatus({
                loading: false,
                success: false,
                error: error.message || "Payment failed",
                reference: null,
                checkoutRequestID: null
            });

            throw error;
        }
    };

    // Simulate callback from payment provider
    const simulateCallback = async (checkoutRequestID, paymentData) => {
        // Wait a few seconds to simulate user completing payment on phone
        await new Promise(resolve => setTimeout(resolve, 5000));

        try {
            // 90% chance of successful payment
            const isSuccessful = Math.random() < 0.9;

            if (isSuccessful) {
                const mpesaReceiptNumber = `M${Math.floor(1000000000 + Math.random() * 9000000000)}`;

                // Update the payment status in the repository
                await paymentRepository.updateStatus(
                    paymentData.paymentId,
                    "COMPLETED",
                    mpesaReceiptNumber,
                    "The service request is processed successfully."
                );

                console.log("Payment completed:", {
                    checkoutRequestID,
                    mpesaReceiptNumber,
                    status: "COMPLETED"
                });
            } else {
                // Payment failed
                await paymentRepository.updateStatus(
                    paymentData.paymentId,
                    "FAILED",
                    null,
                    "Failed to process the payment."
                );

                console.log("Payment failed:", {
                    checkoutRequestID,
                    status: "FAILED"
                });
            }
        } catch (error) {
            console.error("Error processing callback:", error);
        }
    };

    // Get payment history for a user
    const getPaymentHistory = async (userId) => {
        try {
            const payments = await paymentRepository.findByUserId(userId);
            return payments.sort((a, b) =>
                new Date(b.timestamp || 0) - new Date(a.timestamp || 0)
            );
        } catch (error) {
            console.error("Error fetching payment history:", error);
            throw error;
        }
    };

    // Get payment status
    const checkPaymentStatus = async (referenceOrId) => {
        try {
            const payment = await paymentRepository.findById(referenceOrId);
            return payment;
        } catch (error) {
            console.error("Error checking payment status:", error);
            throw error;
        }
    };

    return {
        paymentStatus,
        initiatePayment,
        getPaymentHistory,
        checkPaymentStatus
    };
};