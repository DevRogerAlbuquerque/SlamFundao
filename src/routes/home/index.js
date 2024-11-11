import { Button, Col, Container, Row } from "react-bootstrap";
import Grid from "../../components/Grid";
import logo from '../../imagens/logobanner.png';
import coroa from '../../imagens/coroa.png';
import './index.css'

export const Home = () => {
    return(<>
        <Grid id="home">
            <Container fluid style={{height: '80vh'}}>
                <Row style={{height: '80vh'}}>
                    <Col md={6} className="d-flex flex-column align-items-center justify-content-center" >
                        
                        <img height={'200px'} src={logo}/>
                        <h5>O que é o Slam Fundão?</h5>
                        <Container fluid style={{textAlign: 'center'}}>
                            <Row>
                                <Col className="align-items-right"><Button variant="warning">Saiba mais</Button> </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
                    <img height={'400px'} src={coroa}/>
                        
                    </Col>
                </Row>
            </Container>
        </Grid>
    </>);
}

export default Home;