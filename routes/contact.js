const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {

        user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
        pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
    },
});

async function main() {

    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);

}

main().catch(console.error);