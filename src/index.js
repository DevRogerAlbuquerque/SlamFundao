import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Produtos from './routes/produtos';
import ComprarProduto from './routes/comprar';
import Home from './routes/home/index';
import SobreNos from './routes/sobre';
import Contato from './routes/contato';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} >
          <Route path='/' element={<Home />} />
          <Route path='/produtos' element={<Produtos />} />
          <Route path='/compra' element={<ComprarProduto />} />
          <Route path='/sobre' element={<SobreNos />} />
          <Route path='/contato' element={<Contato />} />
          </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);