import { Router } from 'express';
import { ProductController } from '../controller/productController.js';
import { validateProduct, validateId, validate } from '../middlewares/productValidation.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', ProductController.getProducts); 
router.get('/:id', validateId(), validate, ProductController.getById);
router.post('/', authenticate, validateProduct(), validate, ProductController.create); 
router.patch('/:id', authenticate, validateId(), validate, ProductController.update);
router.delete('/:id', authenticate, validateId(), validate, ProductController.destroy);

export default router;
