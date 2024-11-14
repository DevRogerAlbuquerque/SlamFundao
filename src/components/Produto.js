import { Button, Col, Container, Row } from "react-bootstrap";
import './styles/produto.css';

export const Produto = ({src, alt}) => {
  return (
    <Container className="produto" style={{ width: '100%' }} fluid>
      <Row>
        <Col>
          <img src={src} alt={alt} />
          <Button className="comprar-button">Comprar</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Produto;
