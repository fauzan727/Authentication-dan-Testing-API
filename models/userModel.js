import { db } from '../database/connection.js';

export const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');

  return rows.map(row => ({
    id: row.user_id,
    name: row.user_name || "Unknown User",
    role: "customer"
  }));
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
};

export const createUser = async (name, email, password, role = 'customer') => {
  const [result] = await db.query(
    'INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );
  
  return {
    id: result.insertId,
    name,
    email,
    role: 'customer'
  };
};
