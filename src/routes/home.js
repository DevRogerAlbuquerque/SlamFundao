import React from 'react';
import { Button } from 'react-bootstrap';
import { Card } from 'primereact/card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Carrossel from '../components/Carrossel'; 
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      
      <main className="main-content container">
        <section className="intro-section my-5">
          <Card title="O que é o Slam Fundão?" className="mb-3">
            <p>
              O Slam Fundão é uma batalha de poesia falada que acontece mensalmente nas ruas da periferia de Guarulhos. Somos um espaço de fala para poetas periféricos, promovendo a cultura e a expressão artística na comunidade.
            </p>
            <Button variant="warning" className="mt-3">Saiba Mais</Button>
          </Card>
        </section>

        <section id="catalogo" className="catalog-section my-5">
          <Card title="Catálogo de Produtos" className="mb-3">
            <Carrossel height="50vh" />
            <Button onClick={() => navigate('/produtos')} variant="warning" className="mt-3">Ver Mais Produtos</Button>
          </Card>
        </section>

        <section id="contato" className="contact-section my-5">
          <Card title="Onde Ocorre?" className="mb-3">
            <p>
              Nosso próximo encontro será em Guarulhos. Fique ligado nas nossas redes sociais para mais informações!
            </p>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
