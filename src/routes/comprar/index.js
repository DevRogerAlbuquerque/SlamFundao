import { Col, Row } from "react-bootstrap";
import Grid from "../../components/Grid";
import GrupoCard from "../../components/GrupoCard";
import Carrossel from "../../components/Carrossel";
import { AiFillSchedule } from "react-icons/ai";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Sidebar } from 'primereact/sidebar';

export default function ComprarProduto()
{
    const navigate = useNavigate();
    return (<>
    <Grid>
        <Row>
            <Col className="mb-3">
                    <Row>
                        <Col sm={6}>
                            <GrupoCard height="70vh" header="CAMISETAS">
                                <Carrossel height="65vh" onClick={() => navigate('/Compra')}/>
                            </GrupoCard>
                        </Col>
                        <Col sm={4}>
                            <Row>
                                <Col>
                                    <h1>Teste</h1>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
            </Col>
        </Row>
    </Grid>
    </>)
}