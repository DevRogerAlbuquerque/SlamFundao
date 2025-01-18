import React, { useState } from 'react';
import { Navbar, Nav, Offcanvas, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import logoAmarelo from '../imagens/logoAmarelo.png';

function Header({itensCarrinho}) {
  const [showCart, setShowCart] = useState(false);

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const totalAmount = itensCarrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);

  return (
    <>
      <Navbar style={{backgroundColor: '#4E2759', top: '0'}} data-bs-theme="light"  expand="lg" className="header">
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
              Catálogo
            </Nav.Link>
            <Nav.Link as={Link} to="/contato">
              Contato
            </Nav.Link>
            <Button 
              variant="outline-light" 
              className="cart-button ms-auto" 
              onClick={handleShowCart}>
              <FaShoppingCart /> Carrinho
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Seu Carrinho</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {itensCarrinho.length > 0 ? (
            <ListGroup>
              {itensCarrinho.map(item => (
                <ListGroup.Item key={item.id}>
                  {item.name} - {item.quantity}x R${item.price.toFixed(2)}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>O carrinho está vazio.</p>
          )}
          <div className="mt-3">
            <h5>Total: R${totalAmount.toFixed(2)}</h5>
            <Button variant="success" className="mt-2">
              Finalizar Compra
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Header;
