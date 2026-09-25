import * as ProductModel from '../models/productModel.js';

export const ProductController = {
  getProducts: async (req, res) => {
    try {
      const filters = req.query;
      const products = await ProductModel.getAllProducts(filters);
      res.status(200).json({ success: true, message: "Data produk berhasil diambil", data: products });
    } catch (err) {
      res.status(500).json({ success: false, message: "Gagal mengambil data produk", error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const product = await ProductModel.findProductById(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: "Produk tidak ditemukan" });
      res.status(200).json({ success: true, message: "Detail produk berhasil diambil", data: product });
    } catch (err) {
      res.status(500).json({ success: false, message: "Gagal mengambil detail produk", error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const newProduct = await ProductModel.createProduct(req.body);
      res.status(201).json({ success: true, message: "Produk berhasil ditambahkan", data: newProduct });
    } catch (err) {
      res.status(400).json({ success: false, message: "Gagal menambahkan produk", error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await ProductModel.updateProduct(req.params.id, req.body);
      if (!updated) return res.status(404).json({ success: false, message: "Produk tidak ditemukan" });
      res.status(200).json({ success: true, message: "Produk berhasil diperbarui", data: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: "Gagal memperbarui produk", error: err.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const success = await ProductModel.deleteProduct(req.params.id);
      if (!success) return res.status(404).json({ success: false, message: "Produk tidak ditemukan" });
      res.status(200).json({ success: true, message: "Produk berhasil dihapus" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Gagal menghapus produk", error: err.message });
    }
  }
};
