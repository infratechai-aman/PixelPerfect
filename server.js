import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createTransporter, sendContactEmail, validateContactPayload } from './lib/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); // Sets various HTTP headers for security

// Rate Limiting
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per window
    message: { error: 'Too many requests from this IP, please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// CORS Configuration - Restrict to frontend origin
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite default
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

const transporter = createTransporter();

app.post('/api/contact',
    contactLimiter,
    async (req, res) => {
        const { data, error } = validateContactPayload(req.body);
        if (error) {
            return res.status(400).json({ error });
        }

        console.log(`[${new Date().toISOString()}] Received contact form request from: ${data.user_email}`);

        try {
            await sendContactEmail(data);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email. Please try again later.' });
        }
    }
);

app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] Server is running on port ${PORT}`);
});

// Verify connection configuration
transporter.verify(function (error) {
    if (error) {
        console.log(`[${new Date().toISOString()}] Transporter Error:`, error);
    } else {
        console.log(`[${new Date().toISOString()}] Server is ready to take our messages`);
    }
});
