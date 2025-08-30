import { Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { EmailService } from './email.service'

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) {}



  @Post('send-verification')
  @HttpCode(HttpStatus.OK)
  async sendVerificationEmail() {
    try {
      await this.emailService.sendVerificationEmail('franciscoguillermo.hdez@gmail.com', '111-111', 'Activa tu cuenta con el siguiente OTP');
      
      return {
        success: true,
        message: 'Verification email sent successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  @Get('send-verification')
  public hi() {
    return 'Hi'
  }
}
