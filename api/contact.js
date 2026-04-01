import { sendContactEmail, validateContactPayload } from '../lib/contact.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed.' });
    }

    const { data, error } = validateContactPayload(req.body);
    if (error) {
        return res.status(400).json({ error });
    }

    try {
        await sendContactEmail(data);
        return res.status(200).json({ message: 'Email sent successfully!' });
    } catch (sendError) {
        console.error('Vercel contact API error:', sendError);
        return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
}
