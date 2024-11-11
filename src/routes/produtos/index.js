import { Col, Row } from "react-bootstrap";
import Grid from "../../components/Grid";
import GrupoCard from "../../components/GrupoCard";
import Carrossel from "../../components/Carrossel";
import { AiFillSchedule } from "react-icons/ai";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Sidebar } from 'primereact/sidebar';

export default function Produtos()
{
    const navigate = useNavigate();
    return (<>
    <Grid>
        <Row>
            <Col className="mb-3">
                <GrupoCard header="CAMISETAS" height="80vh">
                    <Row>
                        <Col sm={4}>
                            <GrupoCard height="70vh">
                                <Carrossel height="65vh" onClick={() => navigate('/Produtos')}/>
                            </GrupoCard>
                        </Col>
                        <Col sm={8}>
                            <GrupoCard height="70vh">
                                
                            </GrupoCard>
                        </Col>
                    </Row>
                </GrupoCard>
            </Col>
        </Row>
    </Grid>
    </>)
}