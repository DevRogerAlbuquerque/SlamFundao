import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import Footer from '../../components/Footer';
import logo from '../../imagens/logobanner.png';
import coroa from '../../imagens/coroa.png';
import camisaBranca from '../../imagens/camisaBranca.jpg';
import camisaRoxa from '../../imagens/brancaRoxa.jpg';
import camisaAmarela from '../../imagens/camisaAmarela.jpg';
import './index.css'
import { useNavigate } from "react-router-dom";
import integrantes from '../../imagens/integrantes.jpg';

export const Home = () => {
    const navigate = useNavigate();
    return(<div id="home">
                <Container fluid style={{height: '92vh'}} className="roxoGradiente">
                <Row style={{height: '92vh'}}>
                    <Col md={6} className="d-flex flex-column align-items-center justify-content-center" >
                        
                        <img height={'200px'} src={logo}/>
                        <h5>O que é o Slam Fundão?</h5>
                        <Container fluid style={{textAlign: 'center'}}>
                            <Row>
                                <Col className="align-items-right">
                                <Button onClick={() => navigate('/sobre')} variant="warning">Saiba mais</Button> </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col md={6} className="d-none d-md-flex flex-column align-items-center justify-content-center">
                        <img height={'400px'} src={coroa}/>
                        
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{height: '92vh'}} id="kit">
                <Row style={{height: '92vh'}}>
                    <Col sm={12} md={6} className="d-flex flex-column align-items-center justify-content-center" >
                        
                    <Carousel data-bs-theme="dark" style={{border: '15px solid #4E2759', borderRadius: '5%'}}>
                        <Carousel.Item>
                            <img style={{height: '75vh'}}
                            className="w-100"
                            onClick={() => navigate('/produtos')}
                            src={camisaBranca}
                            alt="First slide" />
                            <Carousel.Caption>
                            <h5>Camiseta Off-White</h5>
                            <p>Confira o Drop de camisetas!</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img style={{height: '75vh'}}
                            className="w-100"
                            onClick={() => navigate('/produtos')}
                            src={camisaAmarela}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h5>Camiseta Amarela</h5>
                            <p>Confira o Drop de camisetas!</p>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img style={{height: '75vh'}}
                            className="w-100"
                            src={camisaRoxa}
                            onClick={() => navigate('/produtos')}
                            alt="First slide"
                            />
                            <Carousel.Caption>
                            <h5>Camiseta Roxa</h5>
                            <p>Confira o Drop de camisetas!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    </Col>
                    <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
                        <h1 className="roxo">SE LIGA NO NOSSO DROP</h1>
                        <h5 className="roxo">Criamos um drop de camisetas e produtos em geral, para que você fique trajado de Fundão!</h5>
                        <h6>Com apenas poucos cliques, você consegue adquirir o seu produto feito pelo Slam Fundão, e apoiar o rolê periférico.</h6>
                        <br></br>
                        <h5 className="roxo">CURTIU?</h5>
                        <Container fluid style={{textAlign: 'center'}}>
                            <Row>
                                <Col className="align-items-right">
                                    <Button onClick={() => {
                                        navigate('/produtos');
                                    }} style={{backgroundColor: '#4E2759', color: 'white', border: 'hidden'}}>Visualizar Produtos</Button> </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{ height: '90vh' }}>
                <Row>
                    <Col md={7} className="d-flex flex-column align-items-center justify-content-center">
                        <h1 className="roxo">O QUE É O SLAM FUNDÃO?</h1>
                        <h5 className="roxo">Você pode estar se perguntando "Ué... mas <b>o que é Slam Fundão?</b>"</h5>
                        <h6>Então, conheça mais sobre o Slam Fundão clicando abaixo</h6>
                        <Container fluid style={{textAlign: 'center'}}>
                            <Row>
                                <Col className="align-items-right">
                                    <Button onClick={() => {
                                        navigate('/sobre');
                                    }} style={{backgroundColor: '#4E2759', color: 'white', border: 'hidden'}}>Saiba mais</Button> </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={12} md={5} className="d-flex flex-column align-items-center justify-content-center" >
                    
                        <img style={{height: '75vh', border: '15px solid #4E2759', borderRadius: '5%'}}
                            className="w-100 border-rounded"
                            src={integrantes} />
                    </Col>
                </Row>
            </Container>
    </div>);
}

export default Home;