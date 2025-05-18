
// Environment configuration
const env = {
    // Original MongoDB connection
    MONGODB_URI: "mongodb://localhost:27017/mydb",

    // Payment gateway config
    PAYHERO: {
        USERNAME: "Haksyx7XofdghvxXVzi2",
        PASSWORD: "avDmJ4r36Ch2XbV4zuxDzLchG419ahOehTLyjlRx",
        STKPUSH_URL: "https://backend.payhero.co.ke/api/v2/payments",
        CALLBACK_URL: "https://your-app.com/api/payment-callback",
        CHANNEL_ID: 2175
    },

    // JWT configuration for authentication
    JWT: {
        SECRET_KEY: "your-secure-jwt-key",
        ACCESS_TOKEN_EXPIRATION: 900000, // 15 minutes in milliseconds
        REFRESH_TOKEN_EXPIRATION: 604800000 // 7 days in milliseconds
    },

    // Application URLs
    APP: {
        FRONTEND_URL: "http://localhost:5173",
        API_BASE_URL: "https://render-spring-backend.onrender.com"
    }
};

export default env;