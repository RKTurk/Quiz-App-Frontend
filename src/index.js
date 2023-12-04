// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import './index.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
