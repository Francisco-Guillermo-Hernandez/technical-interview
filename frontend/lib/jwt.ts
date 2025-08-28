import jwt from "jsonwebtoken";

const SECRET = "SUPER_SECRET_KEY"; // ⚠️ in real apps, use process.env

export function signJwt(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, SECRET) as { username: string; email: string; role: string; exp: number };
  } catch {
    return null;
  }
}