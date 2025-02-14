import { Injectable } from '@nestjs/common';
@Injectable()
export class EmailService {
  async sendEmail(emailInfos: EmailInfos) {
    console.log('Email sent to: ', emailInfos.to);
    console.log('Subject: ', emailInfos.subject);
    console.log('Text: ', emailInfos.text);
  }
}

export interface EmailInfos {
  to: string;
  subject: string;
  text: string;
}
