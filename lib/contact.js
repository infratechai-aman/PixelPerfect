import nodemailer from 'nodemailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanValue(value) {
    return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function toHtmlParagraphs(value) {
    return escapeHtml(value).replace(/\r?\n/g, '<br />');
}

export function validateContactPayload(payload = {}) {
    const data = {
        user_name: cleanValue(payload.user_name),
        mobile_number: cleanValue(payload.mobile_number),
        company_name: cleanValue(payload.company_name),
        user_email: cleanValue(payload.user_email).toLowerCase(),
        message: cleanValue(payload.message),
    };

    if (!data.user_name) {
        return { error: 'Name is required.' };
    }

    if (!data.mobile_number) {
        return { error: 'Mobile number is required.' };
    }

    if (!data.company_name) {
        return { error: 'Company name is required.' };
    }

    if (!data.user_email || !EMAIL_REGEX.test(data.user_email)) {
        return { error: 'Invalid email address.' };
    }

    if (!data.message) {
        return { error: 'Message is required.' };
    }

    return { data };
}

export function createTransporter(env = process.env) {
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = env;

    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
        throw new Error('Missing SMTP configuration. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS.');
    }

    return nodemailer.createTransport({
        host: EMAIL_HOST,
        port: Number(EMAIL_PORT),
        secure: Number(EMAIL_PORT) === 465,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });
}

export async function sendContactEmail(payload, env = process.env) {
    const contactEmail = env.CONTACT_TO_EMAIL || env.EMAIL_USER;

    if (!contactEmail) {
        throw new Error('Missing recipient configuration. Set CONTACT_TO_EMAIL or EMAIL_USER.');
    }

    const transporter = createTransporter(env);
    const mailOptions = {
        from: `"Pixel Perfect Events Website" <${env.EMAIL_USER}>`,
        to: contactEmail,
        replyTo: `"${payload.user_name}" <${payload.user_email}>`,
        subject: `New contact form message from ${payload.user_name}`,
        text: [
            'New Contact Form Message',
            '',
            `Name: ${payload.user_name}`,
            `Mobile Number: ${payload.mobile_number}`,
            `Company Name: ${payload.company_name}`,
            `Email Address: ${payload.user_email}`,
            '',
            'Message:',
            payload.message,
        ].join('\n'),
        html: `
            <h2>New Contact Form Message</h2>
            <p><strong>Name:</strong> ${escapeHtml(payload.user_name)}</p>
            <p><strong>Mobile Number:</strong> ${escapeHtml(payload.mobile_number)}</p>
            <p><strong>Company Name:</strong> ${escapeHtml(payload.company_name)}</p>
            <p><strong>Email Address:</strong> ${escapeHtml(payload.user_email)}</p>
            <p><strong>Message:</strong></p>
            <p>${toHtmlParagraphs(payload.message)}</p>
        `,
    };

    return transporter.sendMail(mailOptions);
}
