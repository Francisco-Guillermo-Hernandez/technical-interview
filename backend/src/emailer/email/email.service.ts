import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";
import { renderHtml } from "../template/activate-account";

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private readonly mailService: MailerService,
  ) {}

  public async sendVerificationEmail(
    to: string,
    otp: string,
    subject: string,
  ): Promise<void> {
    await this.mailService.sendMail({
      from:
        this.configService.get<string>("EMAIL_FROM") ||
        '"Your App" <noreply@yourapp.com>',
      to,
      subject,
      html: renderHtml(otp),
    });
  }
}
