import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer text-white text-center p-3 d-none d-md-block">
      <p>© {(new Date()).getFullYear()} Slam Fundão. Todos os direitos reservados.</p>
      <div className="social-icons">
        <a href="https://www.facebook.com/profile.php?id=100089548663010" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/slamfundao" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://wa.me/5511959241668" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
      </div>
      <p>Guarulhos, São Paulo</p>
    </footer>
  );
}

export default Footer;
