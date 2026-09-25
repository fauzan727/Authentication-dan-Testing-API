import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, getJwtSecret } from '../config/auth.js';

export function issueToken(userId) {
  // getJwtSecret(); // Memastikan JWT_SECRET sudah diatur sebelum implementasi token.
  // throw new Error('Selesaikan LATIHAN B1: issueToken().');
  return jwt.sign(
    { sub: String(userId) },
    getJwtSecret(),
    { algorithm: 'HS256', expiresIn: JWT_EXPIRES_IN }
  );

}

export function verifyToken(token) {
   try {
    const claims = jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] });
    if (typeof claims?.sub !== 'string' ||
        !/^[1-9]\d*$/.test(claims.sub)) return null;
    return claims;
  } catch {
    return null;
  }
}

export { JWT_EXPIRES_IN };
