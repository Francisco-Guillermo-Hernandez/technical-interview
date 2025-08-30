import { registerAs } from "@nestjs/config";
import { env } from "node:process";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter"; // Or PugAdapter/EjsAdapter

import { join } from "node:path";
export default registerAs("emailerConfig", () => ({
  // email_host: env.EMAIL_HOST ?? 'sandbox.smtp.mailtrap.io',
  // email_port: Number(env.EMAIL_PORT ?? '465'),
  // email_user: env.EMAIL_USER ?? '',
  // email_pass: env.EMAIL_PASS ?? ''

  transport: {
    host: env.EMAIL_HOST ?? "sandbox.smtp.mailtrap.io",
    port: Number(env.EMAIL_PORT ?? "465"),
    secure: false, // Use 'true' if using SSL/TLS
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  },
  defaults: {
    from: '"No Reply" <noreply@example.com>',
  },
  template: {
    dir: join(__dirname, "./emailer/templates/"),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}));
