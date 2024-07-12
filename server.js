const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password'  // Replace with your email password or app password
        }
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'fazeqadri@gmail.com', // Replace with your receiving email
        subject: 'New Subscriber',
        text: 'I am a new subscriber to AeroInsight'
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email: ' + error);
        }
        res.status(200).send('Subscription successful!');
    });
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
