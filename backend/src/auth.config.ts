import { registerAs } from "@nestjs/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { JwtSecretRequestType, } from '@nestjs/jwt';
const privatekey = readFileSync(join(__dirname, "../certs/private.key"), "utf8");
const publickey = readFileSync(join(__dirname, "../certs/public.key"), "utf8");

export default registerAs("authConfig", () => ({
  privatekey,
  publickey,

  signOptions: { expiresIn: "1h" },
  secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
    switch (requestType) {
      case JwtSecretRequestType.SIGN:
        return privatekey;
      case JwtSecretRequestType.VERIFY:
        return publickey;        
    }
  },
  verifyOptions: { algorithms: ["RS256"] },
}));
