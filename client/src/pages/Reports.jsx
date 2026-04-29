import React from 'react';
import '../styles/reports.css';

const Reports = () => {
  return (
    <div>
      <h1 className="section-title">Business Reports</h1>
      
      <div className="report-card card">
        <h3>Sales Summary</h3>
        <p>Daily / Weekly / Monthly reports will be shown here.</p>
      </div>

      <div className="report-card card">
        <h3>Best Selling Products</h3>
        <p>Top products report coming soon...</p>
      </div>

      <div className="report-card card">
        <h3>Low Stock & Expiry Alert</h3>
        <p>Alerts will appear here.</p>
      </div>
    </div>
  );
};

export default Reports;