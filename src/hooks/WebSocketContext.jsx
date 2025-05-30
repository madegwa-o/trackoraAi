// hooks/WebSocketContext.jsx
import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";

const WebSocketContext = createContext(undefined);

// Custom hook for WebSocket context
export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};

// WebSocket configuration
const WS_CONFIG = {
    URL: 'ws://localhost:9000/donation/ws',
    MESSAGE_TIMEOUT: 3000,
    DESTINATIONS: {
        CONNECT: '/app/connect',
        DONATE: '/app/donate',
    },
};

// Message types
const MESSAGE_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
};

export const WebSocketProvider = ({ children }) => {
    const [donorList, setDonorList] = useState([]);
    const [message, setMessage] = useState('');
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const websocketRef = useRef(null);
    const messageTimeoutRef = useRef(null);

    // Clear message after timeout
    const clearMessageAfterTimeout = useCallback(() => {
        if (messageTimeoutRef.current) {
            clearTimeout(messageTimeoutRef.current);
        }
        messageTimeoutRef.current = setTimeout(() => {
            setMessage('');
        }, WS_CONFIG.MESSAGE_TIMEOUT);
    }, []);

    // Send WebSocket message
    const sendWebSocketMessage = useCallback((destination, body = {}) => {
        if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
            console.error("WebSocket is not connected");
            return false;
        }

        const message = {
            destination,
            body: JSON.stringify(body),
        };

        websocketRef.current.send(JSON.stringify(message));
        return true;
    }, []);

    // Handle incoming WebSocket messages
    const handleWebSocketMessage = useCallback((event) => {
        console.log('Message received:', event.data);

        try {
            const messageData = JSON.parse(event.data);

            if (messageData.status === MESSAGE_STATUS.SUCCESS) {
                if (messageData.donor) {
                    setDonorList(prevList => [...prevList, messageData.donor]);
                }
                setMessage('Donation successful! Thank you for your contribution.');
                clearMessageAfterTimeout();
            } else if (messageData.status === MESSAGE_STATUS.ERROR) {
                setMessage('Donation failed. Please try again.');
                clearMessageAfterTimeout();
            }
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
            // If not JSON, treat as plain text
            const message = event.data;
            if (message.status === MESSAGE_STATUS.SUCCESS) {
                setMessage('Donation successful! Thank you for your contribution.');
                clearMessageAfterTimeout();
            } else if (message.status === MESSAGE_STATUS.ERROR) {
                setMessage('Donation failed. Please try again.');
                clearMessageAfterTimeout();
            }
        }
    }, [clearMessageAfterTimeout]);

    // WebSocket event handlers
    const handleWebSocketOpen = useCallback(() => {
        setConnectionStatus('Connected');
        console.log('WebSocket connection established.');

        // Send connect message
        sendWebSocketMessage(WS_CONFIG.DESTINATIONS.CONNECT);
    }, [sendWebSocketMessage]);

    const handleWebSocketError = useCallback((error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('Error');
    }, []);

    const handleWebSocketClose = useCallback(() => {
        setConnectionStatus('Disconnected');
        console.log('WebSocket connection closed.');
    }, []);

    // Initialize WebSocket connection
    useEffect(() => {
        websocketRef.current = new WebSocket(WS_CONFIG.URL);

        const ws = websocketRef.current;
        ws.onopen = handleWebSocketOpen;
        ws.onmessage = handleWebSocketMessage;
        ws.onerror = handleWebSocketError;
        ws.onclose = handleWebSocketClose;

        // Cleanup on unmount
        return () => {
            if (messageTimeoutRef.current) {
                clearTimeout(messageTimeoutRef.current);
            }
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [handleWebSocketOpen, handleWebSocketMessage, handleWebSocketError, handleWebSocketClose]);

    // Send donation
    const sendDonation = useCallback(({ amount, phoneNumber, senderName }) => {
        if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
            console.error("WebSocket is not connected.");
            setMessage('Connection error. Please refresh and try again.');
            clearMessageAfterTimeout();
            return;
        }

        if (!amount || !phoneNumber) {
            console.error("Missing required fields: amount or phoneNumber");
            return;
        }

        const donationData = {
            amount: Number(amount),
            phone_number: phoneNumber,
            customer_name: senderName === 'Anonymous' ? null : senderName,
            external_reference: `INV-${new Date().toISOString()}`,
        };

        console.log("Initiating transaction:", donationData);

        const success = sendWebSocketMessage(WS_CONFIG.DESTINATIONS.DONATE, donationData);

        if (success) {
            setMessage('Transaction pending...');
        }
    }, [sendWebSocketMessage, clearMessageAfterTimeout]);

    const contextValue = {
        message,
        sendDonation,
        donorList,
        connectionStatus,
    };

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
};
