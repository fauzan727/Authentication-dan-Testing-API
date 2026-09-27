import { verifyToken } from '../auth/tokenService.js';
import { HttpError } from '../utils/HttpError.js';

export function authenticate(req, res, next) {
  const match = /^Bearer (\S+)$/i.exec(req.get('Authorization') ?? '');
  
  if (!match) {
    return next(new HttpError(401, 'Silakan login dengan token yang valid.'));
  }

  console.log(match[1]);
  
  let claims = null;
  if (match) {
    claims = verifyToken(match[1]);
  }
  
  if (!claims) {
    return next(new HttpError(401, 'Silakan login dengan token yang valid.'));
  }
  
  req.auth = claims;
  next();
}
