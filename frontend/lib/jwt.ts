import env from './env-config';
import { jwtVerify } from 'jose';

export type TokenPayload = {
  email: string;
  isActive: boolean;
  role: string;
  sub: string;
  iat: number;
  exp: number;
};

function base64ToUtf8(base64String: string): string {
  try {
    const base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
    const binaryString = atob(base64);
    const utf8String = new TextDecoder('utf-8').decode(
      new Uint8Array(binaryString.split('').map((c) => c.charCodeAt(0)))
    );

    return utf8String;
  } catch (error) {
    console.error('Failed to decode base64:', error);
    throw error;
  }
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  try {
    const certPem = base64ToUtf8(env.publicCert);

    // Convert PEM -> CryptoKey
    const publicKey = await crypto.subtle.importKey(
      'spki',
      pemToArrayBuffer(certPem),
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const { payload } = await jwtVerify<TokenPayload>(token, publicKey, {
      algorithms: ['RS256'],
    });

    return payload;
  } catch (error) {
    throw error;
  }
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const b64 = pem
    .replace(/-----BEGIN PUBLIC KEY-----/, '')
    .replace(/-----END PUBLIC KEY-----/, '')
    .replace(/\s+/g, '');
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}
