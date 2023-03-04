const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = process.env.PORT || 3010

const transporter = nodemailer.createTransport({
    service: 'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
    const {fullName, contacts, message} = req.body
    const mailOptions = {
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
    }

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log('error', err)
                reject(err)
            } else {
                console.log('info', info);
                resolve(info)
            }
        })
    })
    res.send({data: 'Message sent'})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})