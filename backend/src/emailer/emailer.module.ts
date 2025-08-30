import { Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MailerModule],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService, MailerModule],
})
export class EmailerModule {}
