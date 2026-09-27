import { body, param, validationResult } from 'express-validator';
import { HttpError } from '../utils/HttpError.js';

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach(err => {
      const field = err.path;
      if (!formattedErrors[field]) {
        formattedErrors[field] = [];
      }
      formattedErrors[field].push(err.msg);
    });
    return next(new HttpError(422, 'Validasi gagal', formattedErrors));
  }
  next();
}

const objectRule = () => body().custom(value =>
  value !== null && typeof value === 'object' && !Array.isArray(value)
).withMessage('Body harus berupa object JSON.');

// ==========================================
// VALIDASI PRODUCT
// ==========================================
export const validateProduct = () => [
  objectRule(),
  body('title')
    .isString().withMessage('harus berupa string.').bail()
    .notEmpty().withMessage('Wajib diisi.').bail()
    .isLength({ max: 255 }).withMessage('maksimal 255 karakter.'),
    
  body('description')
    .isString().withMessage('harus berupa string.').bail()
    .notEmpty().withMessage('Wajib diisi.'),
    
  body('price')
    .custom(value => typeof value === 'number' && Number.isFinite(value)).withMessage('harus berupa angka.').bail()
    .notEmpty().withMessage('Wajib diisi.').bail()
    .isFloat({ min: 0 }).withMessage('minimal 0.'),
    
  body('rating')
    .custom(value => typeof value === 'number' && Number.isFinite(value)).withMessage('harus berupa angka.').bail()
    .notEmpty().withMessage('Wajib diisi.').bail()
    .isFloat({ min: 0, max: 10 }).withMessage('antara 0–10.'),
    
  body('category_id')
    .custom(value => Number.isInteger(value)).withMessage('harus berupa integer.').bail()
    .notEmpty().withMessage('Wajib diisi.').bail()
    .custom(async (value) => {
      // Hubungkan dengan DB / ORM Anda di sini jika diperlukan
      const categoryExists = true; 
      if (!categoryExists) {
        throw new Error('kategori harus tersedia di product_categories');
      }
      return true;
    }),
    
  body('file_path')
    .isString().withMessage('harus berupa string.').bail()
    .notEmpty().withMessage('Wajib diisi.'),
    
  body('thumbnail')
    .optional()
    .isString().withMessage('harus berupa string.'),
    
  body('status')
    .optional()
    .isIn(['active', 'inactive']).withMessage('hanya boleh active atau inactive.')
];

// ==========================================
// VALIDASI CATEGORY
// ==========================================
export const validateCategory = () => [
  objectRule(),
  body('name')
    .isString().withMessage('harus berupa string.').bail()
    .notEmpty().withMessage('Wajib diisi.').bail()
    .isLength({ max: 100 }).withMessage('maksimal 100 karakter.'),
    
  body('description')
    .optional()
    .isString().withMessage('harus berupa string.')
];

export const validateId = () => param('id')
  .custom(value => /^[1-9]\d*$/.test(value) && Number.isSafeInteger(Number(value)))
  .withMessage('ID harus berupa bilangan bulat positif.');
