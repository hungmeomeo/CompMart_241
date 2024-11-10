// ./src/services/sendMail.js
import transporter from '@/nodemailer';

export default async function sendEmail({ subject, text, to }) {
    const mailOptions = {
        from: process.env.GMAIL_APP_USERNAME,
        to, // The person you want your email to be sent
        subject,
        text,
        // You can also add in HTML if you dont want plain text
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err)
                return reject('Unable to send email')
            }

            const message = `Message delivered to ${info.accepted}`;
            console.error(message)
            return resolve(message);
        })
    });
}