import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { useState } from 'react';
import Footer from './components/Footer';

function App() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  return (
    <>
    
    <Header itensCarrinho={itensCarrinho} />
      <Outlet context={{setItensCarrinho}} />
      <Footer />
    </>
  );
}

export default App;
