import express from 'express';
import { fileURLToPath } from 'node:url';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);

// Menyajikan folder frontend statis mentah
app.use(express.static(fileURLToPath(new URL('../marketplace-frontend/', import.meta.url))));

app.get('*any', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(fileURLToPath(new URL('../marketplace-frontend/index.html', import.meta.url)));
  }
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Buka http://localhost:3000');
});
