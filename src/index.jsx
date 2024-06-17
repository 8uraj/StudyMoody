import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import rootReducer from './reducer/index.js'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import  { Toaster } from "react-hot-toast";
const persistConfig = {
  key: "root",
  storage,
 
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
 
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
       </PersistGate>
    </Provider>
  </React.StrictMode>
);
