class EmailService {
  sendEmail(from: string, to: string, subject: string, content: string) {
    console.log(`Email sent from ${from} to ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Content: ${content}`);
  }
}

const emailService = new EmailService();
export default emailService;
