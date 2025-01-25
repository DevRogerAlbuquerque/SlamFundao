import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { useState } from 'react';
import Footer from './components/Footer';

function App() {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  const adicionarItensCarrinho = (item) => {
    const produtos = [...itensCarrinho];
    produtos.push(item);
    setItensCarrinho(produtos);
  }

  const removerItemCarrinho = (posicao) => setItensCarrinho(itensCarrinho.filter((produto, index) => index != posicao));

  return (
    <>
    
    <Header itensCarrinho={itensCarrinho} removerItemCarrinho={removerItemCarrinho} />
      <Outlet context={{adicionarItensCarrinho}} />
      <Footer />
    </>
  );
}

export default App;
