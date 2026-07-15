import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

export const sendMail = async(to: string, subject : string, html : string)=> {
    try {
        const response = await transporter.sendMail({
    from: `"Thumblify" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
        })
    console.log("Mail sent successfully.")
    } catch (error) {
        console.log("Error in Mail sending", error)
    }
}