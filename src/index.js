import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './containers/home'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store.js';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Home />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
