import nodemailer from "nodemailer";

export const sendMail = async (
  subject,
  receiver,
  body
) => {

  // ================= TRANSPORTER =================

  const transporter =
    nodemailer.createTransport({

      service: "gmail",

      auth: {

        user:
          process.env.NODEMAILER_EMAIL,

        pass:
          process.env.NODEMAILER_PASSWORD,
      },
    });

  // ================= MAIL OPTIONS =================

  const options = {

    from:
      process.env.NODEMAILER_EMAIL,

    to: receiver,

    subject: subject,

    html: body,
  };

  // ================= SEND EMAIL =================

  await transporter.sendMail(
    options
  );
};