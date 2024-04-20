import { Resend } from 'resend';

const resend = new Resend('re_acD2YRyz_Fb2kWe4smusRfFAF1GJx3syk')

export const sendVerifyEmail = async (emailToTarget) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: emailToTarget,
      subject: 'Now its New Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



