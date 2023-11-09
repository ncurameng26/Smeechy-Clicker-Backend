import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import cookieReducer from "./features/cookie.js"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: {
    cookie: cookieReducer,
  }, //function that takes in info about state, current state and an action, and the resulting state: how we manage states, reducer for each state
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
