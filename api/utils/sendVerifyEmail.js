import { Resend } from 'resend';

const resend = new Resend('re_94QC2V7U_5JcH3soCaK5RHWUDxgmxKmgS');


//Email for verifying 
export const sendVerifyEmail = (emailToTarget) => resend.emails.send({
  from: 'onboarding@resend.dev',
  to: emailToTarget,
  subject: 'Hello World, this is new',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
})

sendVerifyEmail("dev.sureshbhatt@gmail.com")
console.log("sent")