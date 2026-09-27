import { db } from '../database/connection.js';

export const getAllProducts = async (filters = {}) => {
  const { search, category_id, min_price, max_price, sort_by, order } = filters;

  let query = `
    SELECT 
      p.product_id, p.product_name, p.price, p.stock, p.rating, p.description, p.thumbnail, p.status,
      c.category_id, c.category_name, 
      u.user_id, u.user_name
    FROM products p
    LEFT JOIN product_categories c ON p.category_id = c.category_id
    LEFT JOIN users u ON p.user_id = u.user_id
  `;

  const queryParams = [];
  const whereClauses = [];

  if (search) {
    whereClauses.push("p.product_name LIKE ?");
    queryParams.push(`%${search}%`);
  }

  if (category_id) {
    whereClauses.push("p.category_id = ?");
    queryParams.push(category_id);
  }

  if (min_price) {
    whereClauses.push("p.price >= ?");
    queryParams.push(Number(min_price));
  }

  if (max_price) {
    whereClauses.push("p.price <= ?");
    queryParams.push(Number(max_price));
  }

  if (whereClauses.length > 0) {
    query += " WHERE " + whereClauses.join(" AND ");
  }

  const validSortColumns = {
    'price': 'p.price',
    'rating': 'p.rating'
  };

  const validOrder = ['ASC', 'DESC'];

  if (sort_by && validSortColumns[sort_by]) {
    const finalSortColumn = validSortColumns[sort_by];
    const finalOrder = (order && validOrder.includes(order.toUpperCase())) ? order.toUpperCase() : 'ASC';
    query += ` ORDER BY ${finalSortColumn} ${finalOrder}`;
  }

  const [rows] = await db.query(query, queryParams);

  return rows.map(row => {
    let ratingClass = "Regular";
    if (row.rating >= 8.5) {
      ratingClass = "Top Rated";
    } else if (row.rating >= 7.0 && row.rating <= 8.4) {
      ratingClass = "Popular";
    }

    return {
      id: row.product_id,
      title: row.product_name,
      description: row.description || "",
      price: row.price,
      stock: row.stock,
      rating: row.rating,
      rating_class: ratingClass,
      thumbnail: row.thumbnail || "product.jpg",
      status: row.status || "active",
      category: row.category_id ? { id: row.category_id, name: row.category_name } : null,
      seller: row.user_id ? { id: row.user_id, name: row.user_name } : null
    };
  });
};

export const findProductById = async (id) => {
  const query = `
    SELECT 
      p.product_id, p.product_name, p.price, p.stock, p.rating, p.description, p.thumbnail, p.status,
      c.category_id, c.category_name, 
      u.user_id, u.user_name
    FROM products p
    LEFT JOIN product_categories c ON p.category_id = c.category_id
    LEFT JOIN users u ON p.user_id = u.user_id
    WHERE p.product_id = ?
  `;

  const [rows] = await db.query(query, [id]);
  if (rows.length === 0) return null;

  const row = rows[0];

  let ratingClass = "Regular";
  if (row.rating >= 8.5) {
    ratingClass = "Top Rated";
  } else if (row.rating >= 7.0 && row.rating <= 8.4) {
    ratingClass = "Popular";
  }

  return {
    id: row.product_id,
    title: row.product_name,
    description: row.description || "",
    price: row.price,
    stock: row.stock,
    rating: row.rating,
    rating_class: ratingClass,
    thumbnail: row.thumbnail || "product.jpg",
    status: row.status || "active",
    category: row.category_id ? { id: row.category_id, name: row.category_name } : null,
    seller: row.user_id ? { id: row.user_id, name: row.user_name } : null
  };
};

export const createProduct = async (data) => {
  const product_name = data.product_name || data.title;
  const price = data.price || 0;
  const stock = data.stock || 0;
  const rating = data.rating || 0;
  const { category_id, description, thumbnail, status } = data;

  const [result] = await db.query(
    'INSERT INTO products (product_name, price, stock, rating, category_id, description, thumbnail, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [product_name, price, stock, rating, category_id, description, thumbnail, status || 'active']
  );

  return findProductById(result.insertId);
};

export const updateProduct = async (id, data) => {
  const product_name = data.product_name || data.title;
  const price = data.price || 0;
  const stock = data.stock || 0;
  const rating = data.rating || 0;
  const { category_id, description, thumbnail, status } = data;

  await db.query(
    'UPDATE products SET product_name = ?, price = ?, stock = ?, rating = ?, category_id = ?, description = ?, thumbnail = ?, status = ? WHERE product_id = ?',
    [product_name, price, stock, rating, category_id, description, thumbnail, status, id]
  );

  return findProductById(id);
};

export const deleteProduct = async (id) => {
  const [result] = await db.query('DELETE FROM products WHERE product_id = ?', [id]);
  return result.affectedRows > 0;
};
