import { Col, Row, Container, Carousel, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './index.css';
import Produto from "../../components/Produto";
import camisaBranca from '../../imagens/camisaBranca2.jpg';
import camisaAmarela from '../../imagens/camisaAmarela.jpg';
import camisaRoxa from '../../imagens/brancaRoxa.jpg';
import { useState } from "react";

export default function Produtos() {
    const [catalogoVisible, showCatalogo] = useState(true);
    const [produtoDetalhado, setProdutoDetalhado] = useState({});

    const produtos = [
        { nome: 'Camiseta Off-White', valor: 50, imagem: camisaBranca, imagens: 'images/camisetas/branca/' },
        { nome: 'Camiseta Amarela', valor: 50, imagem: camisaAmarela, imagens: 'images/camisetas/amarela/' },
        { nome: 'Camiseta Roxa', valor: 50, imagem: camisaRoxa, imagens: 'images/camisetas/roxa/' },
    ];

    return (
        <Container fluid style={{ height: '90vh', marginTop: '10vh' }}>
            {catalogoVisible && 
                <><Row>
                    <Col><h1 className="roxo mt-3">DROP DO FUNDÃO</h1></Col>
                </Row>
                <Row>
                    {produtos.map((produto, index) => (
                        <Col
                            key={index}
                            xs={12}
                            sm={12}
                            md={4} >
                            <Produto
                                valor={produto.valor}
                                src={produto.imagem}
                                descricao={produto.nome}
                                onClick={() => {
                                    showCatalogo(false);
                                    setProdutoDetalhado(produto);
                                }}
                            />
                        </Col>
                    ))}
                </Row>
                </>
            }
            {!catalogoVisible && 
                <>
                    <Row>
                        <Col><h1 className="roxo mt-3">{produtoDetalhado.nome}</h1></Col>
                    </Row>
                    <Row>
                        <Col md={4}  className="d-flex align-items-center justify-content-center">
                            <Carousel style={{border: '15px solid #4E2759', borderRadius: '5%'}}>
                                {[1, 2, 3, 4].map(item => 
                                    <Carousel.Item>
                                        <img style={{height: '70vh'}}

                                        src={`${produtoDetalhado.imagens}${item}.jpg`}/>
                                    </Carousel.Item>
                                )}
                            </Carousel>
                        </Col>
                        <Col md={8} className="backgroundRoxo" style={{borderRadius: '5%'}}>
                                <Container fluid>
                                    <Row>
                                        <Col md={6} style={{border: '5px solid #FFC670', borderRadius: '5%'}}>A</Col>
                                    </Row>
                                </Container>
                        </Col>
                    </Row>
                </>
            }
        </Container>
    );
}
