import React from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <h1 className="section-title">Dashboard - Bishoftu Store</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Today's Sales</h3>
          <h2>ETB 12,450</h2>
          <p style={{color:'#10b981'}}>+18% from yesterday</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <h2>248</h2>
          <p>Active Items</p>
        </div>
        <div className="stat-card">
          <h3>Low Stock</h3>
          <h2 style={{color:'#d97706'}}>14</h2>
          <p>Need Attention</p>
        </div>
        <div className="stat-card">
          <h3>Monthly Revenue</h3>
          <h2>ETB 124,500</h2>
          <p>This Month</p>
        </div>
      </div>

      <div className="card" style={{marginTop: '30px'}}>
        <h3>Quick Actions</h3>
        <p>Welcome to your store management system.</p>
      </div>
    </div>
  );
};

export default Dashboard;