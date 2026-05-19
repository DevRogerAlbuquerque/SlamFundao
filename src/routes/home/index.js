import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

import logo from "../../imagens/logobanner.png";
import coroa from "../../imagens/coroa.png";
import camisaBranca from "../../imagens/camisaBranca.jpg";
import camisaRoxa from "../../imagens/brancaRoxa.jpg";
import camisaAmarela from "../../imagens/camisaAmarela.jpg";
import integrantes from "../../imagens/integrantes.jpg";

import "./index.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div id="home">
      {/* HERO */}
      <section className="hero roxoGradiente">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6} className="text-center text-md-start">
              <img src={logo} alt="Slam Fundão" className="logo-home" />

              <h1>Conheça o Slam Fundão</h1>
              <p className="hero-subtitle">
                Cultura, poesia e resistência periférica
              </p>

              <div className="hero-actions">
                <Button className="btn-secondary-custom"
                  onClick={() => navigate("/sobre")}
                >
                  O que é o Slam?
                </Button>

                <Button
                  className="btn-primary-custom"
                  onClick={() => navigate("/produtos")}
                >
                  Ver produtos
                </Button>
              </div>
            </Col>

            <Col md={6} className="d-none d-md-flex justify-content-center">
              <img src={coroa} alt="Coroa" className="hero-image" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* PRODUTOS */}
      <section className="section">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6}>
              <Carousel className="carousel-produtos">
                {[camisaBranca, camisaAmarela, camisaRoxa].map((img, i) => (
                  <Carousel.Item key={i}>
                    <div
                      className="clickable-card"
                      onClick={() => navigate("/produtos")}
                    >
                      <img src={img} alt="Produto Slam Fundão" />
                      <div className="overlay">Ver produtos</div>
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            <Col xs={12} md={6} className="mt-4 mt-md-0">
              <h2>Se liga no nosso drop</h2>

              <ul className="benefits-list">
                <li>✔ Camisetas exclusivas</li>
                <li>✔ Apoio à cultura periférica</li>
                <li>✔ Compra rápida e segura</li>
              </ul>

              <Button
                className="btn-primary-custom mt-3"
                onClick={() => navigate("/produtos")}
              >
                Explorar produtos
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* SOBRE */}
      <section className="section alt">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={7}>
              <h2>O que é o Slam Fundão?</h2>
              <p>
                Um movimento cultural que fortalece a poesia falada e a
                resistência periférica.
              </p>

              <Button
                className="btn-primary-custom"
                onClick={() => navigate("/sobre")}
              >
                Saiba mais
              </Button>
            </Col>

            <Col xs={12} md={5} className="mt-4 mt-md-0 text-center">
              <img
                src={integrantes}
                alt="Integrantes Slam Fundão"
                className="img-bordered"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* LOCALIZAÇÃO */}
        <section className="section localizacao">
        <Container>
            <Row className="mb-4 text-center">
            <Col>
                <h2>Onde estamos localizados</h2>
                <p className="localizacao-subtitle">
                Nosso slam acontece no fundão de Guarulhos, fortalecendo a cultura e a poesia.
                </p>
            </Col>
            </Row>

            <Row className="align-items-center">
            <Col xs={12} md={5} className="mb-4 mb-md-0">
                <h3>Slam Fundão</h3>
                <p>
                📍 Praça Estrela<br />
                Cidade Soberana – Guarulhos / SP
                </p>

                <p className="localizacao-info">
                Chega junto, cola com a gente e fortalece a cena cultural periférica.
                </p>
            </Col>

            <Col xs={12} md={7} className="bordaRoxa">
                <div className="mapa-wrapper">
                <iframe
                    title="Localização Slam Fundão"
                    src="https://www.google.com/maps?q=Praça%20Estrela%20Guarulhos&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>
            </Col>
            </Row>
        </Container>
        </section>


      {/* CTA MOBILE */}
      <div className="cta-mobile d-md-none">
        <Button
          className="cta-mobile-btn"
          onClick={() => navigate("/produtos")}
        >
          Ver produtos
        </Button>
      </div>
    </div>
  );
}
