import { Col, Row, Container } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import './index.css';
import Produto from "../../components/Produto";
import camisaBranca from '../../imagens/camisaBranca2.jpg';
import camisaAmarela from '../../imagens/camisaAmarela.jpg';
import camisaRoxa from '../../imagens/brancaRoxa.jpg';
import camisaBranca2 from '../../imagens/camisaBranca.jpg';

export default function Produtos()
{
    const navigate = useNavigate();

    return (<>
    <Container fluid className="d-flex flex-column align-items-center justify-content-center" style={{height: '100vh'}}>
        <h1 className="roxo">DROP DO FUNDÃO</h1>
        <Row>
            <Col sm={12} md={4} className="mb-3 p-0">
                <Produto src={camisaBranca} descricao={"CAMISETA OFF WHITE - Valor: R$50"} />
            </Col>
            <Col sm={12} md={4} className="mb-3 p-0">
                <Produto descricao={"CAMISETA AMARELA - Valor: R$50"} src={camisaAmarela} />
            </Col>
            <Col sm={12} md={4} className="mb-3 p-0">
                <Produto descricao={"CAMISETA ROXA - Valor: R$50"} src={camisaRoxa} />
            </Col>
        </Row>
    </Container>
    </>)
}