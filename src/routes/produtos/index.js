import { Col, Row, Container } from "react-bootstrap";
import Grid from "../../components/Grid";
import GrupoCard from "../../components/GrupoCard";
import Carrossel from "../../components/Carrossel";
import { AiFillSchedule } from "react-icons/ai";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Sidebar } from 'primereact/sidebar';
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
            <Col className="d-flex flex-column align-items-center justify-content-center">
                <Produto src={camisaBranca} />
            </Col>
            <Col className="d-flex flex-column align-items-center justify-content-center">
                <Produto src={camisaAmarela} />
            </Col>
            <Col className="d-flex flex-column align-items-center justify-content-center">
                <Produto src={camisaBranca2} />
            </Col>
            <Col className="d-flex flex-column align-items-center justify-content-center">
                <Produto src={camisaRoxa} />
            </Col>
        </Row>
    </Container>
    </>)
}