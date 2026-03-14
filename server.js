import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

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

// Create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/api/contact',
    contactLimiter,
    [
        body('user_name').trim().notEmpty().withMessage('Name is required').escape(),
        body('user_email').isEmail().withMessage('Invalid email address').normalizeEmail(),
        body('message').trim().notEmpty().withMessage('Message is required').escape()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        const { user_name, user_email, message } = req.body;
        console.log(`[${new Date().toISOString()}] Received contact form request from: ${user_email}`);

        try {
            const mailOptions = {
                from: `"${user_name}" <${process.env.EMAIL_USER}>`,
                to: 'info@pixelperfectevents.ae',
                replyTo: user_email,
                subject: `New Contact Form Message from ${user_name}`,
                text: `Name: ${user_name}\nEmail: ${user_email}\nMessage: ${message}`,
                html: `
                    <h3>New Contact Form Message</h3>
                    <p><strong>Name:</strong> ${user_name}</p>
                    <p><strong>Email:</strong> ${user_email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `,
            };

            await transporter.sendMail(mailOptions);
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
transporter.verify(function (error, success) {
    if (error) {
        console.log(`[${new Date().toISOString()}] Transporter Error:`, error);
    } else {
        console.log(`[${new Date().toISOString()}] Server is ready to take our messages`);
    }
});
