import 'file-loader?name=[name].[ext]!./index.html';
import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import './App.scss';

const appElement = document.getElementById('root');

if (appElement) {
  const root = createRoot(appElement);
  root.render(<App />);
}
