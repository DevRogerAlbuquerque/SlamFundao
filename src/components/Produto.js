import { Button, Col, Container, Row } from "react-bootstrap";
import './styles/produto.css';
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Produto = ({src, alt, descricao}) => {
  const navigate = useNavigate();
  return (
    <Container className="produto" style={{ width: '100%' }} fluid>
      <Row>
        <Col className="p-0 mx-3">
          <img src={src} height={"470px"} alt={alt} />
          <Button className="comprar-button" onClick={() => navigate('../compra')}><FaEye /> Visualizar</Button>
        </Col>
      </Row>
      <Row>
        <Col className="descricaoProduto rounded-bottom mx-3" style={{backgroundColor: 'purple', color: 'white'}}>{descricao}</Col>
      </Row>
    </Container>
  );
}

export default Produto;
