import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { useState } from 'react';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

function App() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const { usuario, setUsuario } = useAuth();

  const adicionarItensCarrinho = (item) => {
    let produtos = [...itensCarrinho];
    const produtoExistente = produtos.find(x => x.nome === item.nome && x.tamanho === item.tamanho);
  
    if (produtoExistente)
      produtoExistente.quantidade = parseInt(produtoExistente.quantidade) + parseInt(item.quantidade);
    else
      produtos.push(item);
    
    setItensCarrinho(produtos);
  }
  

  const removerItemCarrinho = (posicao) => posicao ? setItensCarrinho(itensCarrinho.filter((produto, index) => index !== posicao)) : setItensCarrinho([]);

  return (
    <>
    
    <Header usuario={usuario} setUsuario={setUsuario} itensCarrinho={itensCarrinho} removerItemCarrinho={removerItemCarrinho}  />
      <Outlet context={{adicionarItensCarrinho, itensCarrinho, removerItemCarrinho}} />
      <Footer />
    </>
  );
}

export default App;
