import { registerAs } from "@nestjs/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { env } from "node:process";
import { JwtSecretRequestType } from "@nestjs/jwt";

const getPlainKey = (keyInBase64: string) =>
  Buffer.from(keyInBase64, "base64").toString("utf8");

const mode = env.MODE ?? "DEVELOPMENT";
const privatekey =
  mode === "DEVELOPMENT"
    ? readFileSync(join(__dirname, "../certs/private.key"), "utf8")
    : getPlainKey(env.PRIVATE_KEY ?? "");
const publickey =
  mode === "DEVELOPMENT"
    ? readFileSync(join(__dirname, "../certs/public.key"), "utf8")
    : getPlainKey(env.PUBLIC_KEY ?? "");

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
