import React from 'react';
import Sidebar from './Sidebar'; // You can create a simple Sidebar or add it later

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;