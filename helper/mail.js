import nodemailer from 'nodemailer';


async function sendMail(emailId, subject, body) {

    try {

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'joshuaashvinth@gmail.com',
                pass: process.env.GMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let mailOption = {
            from: 'App CRM <joshuaashvinth@gmail.com>',
            cc: 'joshuaashvinth@gmail.com',
            to: emailId,
            subject: subject,
            html: body,
        }

        await transporter.sendMail(mailOption)

    } catch (error) {
        console.log(error);
    }
}

async function leadMail(title, _id) {

    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'joshuaashvinth@gmail.com',
                pass: process.env.GMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let mailOption = {
            from: 'App CRM <joshuaashvinth@gmail.com>',
            to: 'joshuaashvinth@gmail.com',
            subject: `New Lead (${title})`,
            html: `<h3>New Lead Created</h3></b>
            <p></p>
            <p>Title: ${title}</p></b>
            <span>View: </span><a href="${process.env.URL}/leads/view/${_id}">${process.env.URL}/leads/view/${_id}</a >`,
        }

        await transporter.sendMail(mailOption);

    } catch (error) {
        console.log(error);
    }
}

async function serviceReqMail(title, _id) {

    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'joshuaashvinth@gmail.com',
                pass: process.env.GMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        let mailOption = {
            from: 'App CRM <joshuaashvinth@gmail.com>',
            to: 'joshuaashvinth@gmail.com',
            subject: `New Service Request (${title})`,
            html: `<h3>New Service Request Created</h3></b>
            <p></p>
            <p>Title: ${title}</p></b>
            <span>View: </span><a href="${process.env.URL}/services/view/${_id}">${process.env.URL}/services/view/${_id}</a >`,
        }

        await transporter.sendMail(mailOption);

    } catch (error) {
        console.log(error);
    }
}

export { sendMail, leadMail, serviceReqMail }
