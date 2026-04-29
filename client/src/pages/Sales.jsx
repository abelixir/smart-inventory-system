
import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/products';
import { createSale } from '../services/sales';
import Button from '../components/Button';
import '../styles/sales.css';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    getAllProducts().then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    const existing = cart.findIndex(item => item._id === product._id);
    if (existing !== -1) {
      const updated = [...cart];
      updated[existing].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0);
  const finalTotal = total - discount;

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Cart is empty");

    const saleData = {
      items: cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
        unitPrice: item.sellingPrice
      })),
      totalAmount: total,
      discount,
      finalAmount: finalTotal,
      cashier: JSON.parse(localStorage.getItem('user')).name
    };

    try {
      await createSale(saleData);
      alert("Sale completed successfully!");
      setCart([]);
      setDiscount(0);
      // In real app, update stock here
    } catch (err) {
      alert("Checkout failed");
    }
  };

  return (
    <div className="sales-container">
      <div>
        <h1 className="section-title">Point of Sale (POS)</h1>
        <input 
          type="text" 
          placeholder="Scan Barcode or Search Product" 
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          style={{width:'100%', padding:'14px', marginBottom:'20px', borderRadius:'8px'}}
        />

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(180px, 1fr))', gap:'15px'}}>
          {products.map(product => (
            <div key={product._id} className="card" style={{cursor:'pointer'}} onClick={() => addToCart(product)}>
              <h4>{product.name}</h4>
              <p>ETB {product.sellingPrice} | Stock: {product.quantityInStock}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="cart">
        <h3>Current Cart ({cart.length})</h3>
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <div>
              <strong>{item.name}</strong> × {item.quantity}
            </div>
            <div>
              ETB {(item.sellingPrice * item.quantity).toFixed(2)}
              <Button onClick={() => removeFromCart(item._id)} variant="danger" style={{marginLeft:'10px', padding:'4px 8px', fontSize:'0.8rem'}}>Remove</Button>
            </div>
          </div>
        ))}

        <div style={{marginTop:'30px', borderTop:'2px solid #eee', paddingTop:'15px'}}>
          <p><strong>Total:</strong> ETB {total.toFixed(2)}</p>
          <Input label="Discount (ETB)" type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} />
          <h2>Final: ETB {finalTotal.toFixed(2)}</h2>

          <Button onClick={handleCheckout} variant="success" style={{width:'100%', marginTop:'15px', padding:'16px'}}>
            Complete Sale & Print Receipt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sales;