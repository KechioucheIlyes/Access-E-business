
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // Remplacez par les paramètres de votre serveur de messagerie
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

export async function sendEmail({ to, subject, text, html }) {
    await transporter.sendMail({
        from: 'Access OptimScore',
        to,
        subject,
        text,
        html,
    });
}
