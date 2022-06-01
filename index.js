const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let port = process.env.PORT || 3010
let smtpLogin = process.env.SMTP_LOGIN || '---'
let smtpPassword = process.env.SMTP_PASSWORD || '---'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: smtpLogin,
        pass: smtpPassword,
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
    let {fullName, contacts, message} = req.body
    let mailOptions = {
        from: 'portfolioevgenizhukavets@gmail.com', // sender address
        to: 'yauhenizhukovets@gmail.com', // list of receivers
        subject: 'Portfolio feedback', // Subject line
        html: `<div>
        <b>Name</b>: ${fullName}
        </div>
        <div>
        <b>Contacts</b>: ${contacts}
        </div>
        <div>
        <b>Message</b>: ${message}
        </div>`
    };

    await transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    res.send({data: 'Message sent'})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})