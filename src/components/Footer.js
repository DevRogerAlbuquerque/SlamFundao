import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer text-white text-center p-3">
      <p>© 2024 Slam Fundão. Todos os direitos reservados.</p>
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
      </div>
      <p>Guarulhos, São Paulo</p>
    </footer>
  );
}

export default Footer;
