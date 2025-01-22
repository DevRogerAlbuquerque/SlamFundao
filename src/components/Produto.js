import { Button, Col, Container, Row } from "react-bootstrap";
import './styles/produto.css';
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Produto = ({src, alt, descricao, valor, onClick}) => {
  const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 3 }
  const formatNumber = new Intl.NumberFormat('pt-BR', options)
  return (
    <Container className="produto" style={{ width: '100%' }} fluid>
      <Row>
        <Col className="p-0 mx-3">
          <img src={src} height={"470px"} alt={alt} />
          <Button className="comprar-button" onClick={onClick}><FaEye /> Visualizar</Button>
        </Col>
      </Row>
      <Row>
        <Col className="descricao mx-3" style={{backgroundColor: '#FFC670', border: '5px solid rgb(78, 39, 89)'}}>{descricao}</Col>
      </Row>
      <Row>
        <Col className="descricao rounded-bottom mx-3" style={{backgroundColor: 'rgb(78, 39, 89)', 
          color: 'white', borderBottom: '1px solid black'}}>Valor: {formatNumber.format(valor)}</Col>
      </Row>
    </Container>
  );
}

export default Produto;
