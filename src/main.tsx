import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './Container/App'
import { Provider } from 'react-redux'
import { store } from './Storage'
import { BrowserRouter } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from 'react-toastify'

import 'primereact/resources/themes/viva-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <ToastContainer />
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
