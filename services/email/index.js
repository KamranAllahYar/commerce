"use strict";
const nodemailer = require("nodemailer");
const zohoTransporter= require("./zoho"); // nodemailer transport

async function main({subject = '', from, fromName = 'WeShip', to, text = '', html = ''}) {
    if (Array.isArray(to)) {
        to = to.join(',');
    }
    const transporter = nodemailer.createTransport(zohoTransporter);
    /* send email using a transport */
    let response = await transporter.sendMail({
        from: `"${fromName}" <${from}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    });
    if (!response.messageId) {
        return {
            status: true, message: 'Email not sent',
        };
    }
    return {
        status: true, message: 'Email sent', data: {
            messageId: response.messageId
        }
    };
}

module.exports = main;
