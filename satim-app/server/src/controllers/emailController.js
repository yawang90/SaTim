import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (req, res) => {
    try {
        await sgMail.send({
            to: req.body.to,
            from: 'your_verified_sender@example.com',
            subject: req.body.subject,
            text: req.body.text
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
}