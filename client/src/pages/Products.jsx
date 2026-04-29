import React, { useState, useEffect } from 'react';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/products';
import Table from '../components/Table';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';
import '../styles/products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', purchasePrice: '', sellingPrice: '', quantityInStock: '', reorderLevel: '' });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
      } else {
        await createProduct(formData);
      }
      setModalOpen(false);
      setEditingProduct(null);
      setFormData({ name: '', category: '', purchasePrice: '', sellingPrice: '', quantityInStock: '', reorderLevel: '' });
      loadProducts();
    } catch (err) {
      alert('Error saving product');
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Category", accessor: "category" },
    { header: "Stock", accessor: "quantityInStock" },
    { header: "Selling Price", accessor: "sellingPrice" },
    { header: "Actions", render: (row) => (
      <div className="product-actions">
        <Button onClick={() => { setEditingProduct(row); setFormData(row); setModalOpen(true); }} variant="primary">Edit</Button>
        <Button onClick={() => deleteProduct(row._id).then(loadProducts)} variant="danger">Delete</Button>
      </div>
    )}
  ];

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <h1 className="section-title">Products Management</h1>
        <Button onClick={() => { setEditingProduct(null); setFormData({}); setModalOpen(true); }}>Add New Product</Button>
      </div>

      <input type="text" placeholder="Search products..." className="search-bar" />

      <Table columns={columns} data={products} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingProduct ? "Edit Product" : "Add Product"}>
        <form onSubmit={handleSubmit}>
          <Input label="Product Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          <Input label="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required />
          <Input label="Purchase Price" type="number" value={formData.purchasePrice} onChange={(e) => setFormData({...formData, purchasePrice: e.target.value})} required />
          <Input label="Selling Price" type="number" value={formData.sellingPrice} onChange={(e) => setFormData({...formData, sellingPrice: e.target.value})} required />
          <Input label="Quantity in Stock" type="number" value={formData.quantityInStock} onChange={(e) => setFormData({...formData, quantityInStock: e.target.value})} required />
          <Input label="Reorder Level" type="number" value={formData.reorderLevel} onChange={(e) => setFormData({...formData, reorderLevel: e.target.value})} />
          <Button type="submit">{editingProduct ? "Update" : "Create"} Product</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Products;