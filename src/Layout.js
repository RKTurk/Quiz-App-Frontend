import React from 'react';
import './Layout.css'; // Import additional styles if needed

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      {/* Additional layout elements can be added here */}
      {children}
    </div>
  );
};

export default Layout;
