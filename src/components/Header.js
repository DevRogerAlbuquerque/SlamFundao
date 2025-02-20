import React, { useState } from 'react';
import { Navbar, Nav, Offcanvas, Button, ListGroup } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import logoAmarelo from '../imagens/logoAmarelo.png';
import { FaCartShopping } from 'react-icons/fa6';

function Header({itensCarrinho, removerItemCarrinho}) {
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);
  const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 3 }
  const formatNumber = new Intl.NumberFormat('pt-BR', options);

  const valorTotal = itensCarrinho.reduce((total, item) => total + item.valor * item.quantidade, 0);
  const navigate = useNavigate();

  return (
    <>
      <Navbar style={{backgroundColor: '#4E2759', top: '0'}} data-bs-theme="dark"  expand="lg" className="header">
      <Navbar.Brand as={Link} to="/" className="brand">
          <img src={logoAmarelo} style={{height: '30px'}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/sobre">
              Sobre
            </Nav.Link>
            <Nav.Link as={Link} to="/produtos">
              Produtos
            </Nav.Link>
            <Nav.Link as={Link} to="/contato">
              Contato
            </Nav.Link>
            <Button 
              variant="outline" 
              className="cart-button ms-auto" 
              onClick={handleShowCart}>
              <b><FaShoppingCart /> Carrinho</b>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><FaCartShopping /> Seu Carrinho</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {itensCarrinho.length > 0 ? (
            <ListGroup>
              {itensCarrinho.map((item, index) => (
                <ListGroup.Item key={index}>
                  <div class="grid gap-0 d-flex">
                    <div class="p-2 g-col-6">{item.nome} - {item.tamanho} - <b>{item.quantidade} x {formatNumber.format(item.valor)}</b></div>
                    <div class="p-2 g-col-6"><Button onClick={() => removerItemCarrinho(index)} className='backgroundRoxo'><FaTimes /></Button></div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>O carrinho está vazio.</p>
          )}
          <div className="mt-3">
            <h5 className='amarelo'>Total: {formatNumber.format(valorTotal)}</h5>
            <Button onClick={() => {
                navigate('/compra');
                setShowCart(false);
              }
            } className="mt-2 backgroundAmarelo" disabled={!itensCarrinho.length}>
              Finalizar Compra
            </Button>
            <Button onClick={() => removerItemCarrinho()} style={{backgroundColor: 'white', color: 'rgb(78, 39, 89)'}} className="mt-2" disabled={!itensCarrinho.length}>
              Esvaziar Carrinho
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
