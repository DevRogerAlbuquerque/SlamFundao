import { Col, Row, Container, Carousel, Card, ButtonGroup, Button, ButtonToolbar, Form, Breadcrumb } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import './index.css';
import Produto from "../../components/Produto";
import camisaBranca from '../../imagens/camisaBranca2.jpg';
import camisaAmarela from '../../imagens/camisaAmarela.jpg';
import camisaRoxa from '../../imagens/brancaRoxa.jpg';
import { useRef, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Toast } from 'primereact/toast';
import { FaReply } from "react-icons/fa";

export default function Produtos() {
    const [catalogoVisible, showCatalogo] = useState(true);
    const [produtoDetalhado, setProdutoDetalhado] = useState({});
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState('M');
    const [quantidade, setQuantidade] = useState(1);
    const toast = useRef(null);

    const {adicionarItensCarrinho} = useOutletContext();

    const comprar = () => {
        adicionarItensCarrinho({...produtoDetalhado, ...{
            quantidade: quantidade,
            tamanho: tamanhoSelecionado
        }});
        toast.current.show({ severity: 'success', summary: 'Slam Fundão informa:', 
            detail: 'Seu produto foi adicionado ao carrinho!',
            life: 6000,
            className: 'backgroundAmarelo' })
    }
        
    const produtos = [
        { nome: 'Camiseta Off-White', valor: 50, imagem: camisaBranca, imagens: 'images/camisetas/branca/' },
        { nome: 'Camiseta Amarela', valor: 50, imagem: camisaAmarela, imagens: 'images/camisetas/amarela/' },
        { nome: 'Camiseta Roxa', valor: 50, imagem: camisaRoxa, imagens: 'images/camisetas/roxa/' },
    ];

    return (
        <>
            <Container fluid style={{ height: '90vh', marginTop: '10vh' }}>
                {catalogoVisible && 
                    <><Row>
                        <Col><h1 className="roxo d-flex align-items-center justify-content-center mt-3">DROP DO FUNDÃO</h1></Col>
                    </Row>
                    <Row>
                        {produtos.map((produto, index) => (
                            <Col className="mb-3"
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
                            <Col md={6}  className="d-flex align-items-center justify-content-center">
                                <Carousel style={{border: '15px solid #4E2759', borderRadius: '5%'}}>
                                    {[1, 2, 3, 4].map(item => 
                                        <Carousel.Item>
                                            <img style={{height: '70vh'}}

                                            src={`${produtoDetalhado.imagens}${item}.jpg`}/>
                                        </Carousel.Item>
                                    )}
                                </Carousel>
                            </Col>
                            <Col md={6} className="p-0">
                                    <Container fluid>
                                        <Row className="mt-3">
                                            <Col md={12}>
                                                <h6 className="roxo">Nossa camisa do Slam Fundão é confeccionada em 100% algodão, garantindo conforto e durabilidade. 
                                                    Feita totalmente à mão, ela carrega o cuidado e a exclusividade de um produto artesanal. A peça apresenta nosso logo próprio,
                                                    com uma impressão também feita à mão, trazendo autenticidade e conexão com a cultura do Slam. Uma camisa única para quem carrega 
                                                    a poesia no peito!
                                                </h6>
                                            </Col>                                       
                                        </Row>
                                        <Row className="mt-3 ">
                                            <Col md={12}><h1 className="roxo">VALOR: {produtoDetalhado.valor}</h1></Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col><h6 className="roxo">Selecione o tamanho</h6></Col>
                                        </Row>
                                        <Row className="mb-3">
                                            <Col> 
                                                <ButtonToolbar aria-label="Toolbar with button groups">
                                                    <ButtonGroup className="me-2">
                                                        {['P', 'M', 'G', 'GG'].map((tamanho, index) => 
                                                            <Button className={tamanhoSelecionado == tamanho ? "backgroundAmarelo" : "backgroundRoxo"}
                                                            onClick={() => setTamanhoSelecionado(tamanho)} 
                                                                key={index}>{tamanho}</Button>
                                                        )}
                                                    </ButtonGroup>
                                                </ButtonToolbar>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col><h6 className="roxo">Selecione a quantidade: {quantidade}</h6></Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col md={3}><Form.Range onChange={(event) => setQuantidade(event.target.value)} 
                                            min={1} 
                                            max={10}
                                            className="custom-range"
                                            value={quantidade}></Form.Range></Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col><h6 className="roxo">Comprar</h6></Col>
                                        </Row>
                                        <Row>
                                            <Col sm={12} md={3}><Button onClick={comprar} className="mt-3 w-100 backgroundRoxo"><FaCartShopping /></Button></Col>
                                            <Col sm={12} md={3}><Button className="backgroundRoxo mt-3 w-100" onClick={() => {
                                                showCatalogo(true);
                                                setProdutoDetalhado({});
                                                setQuantidade(1);
                                                setTamanhoSelecionado('M');
                                            }}><FaReply /></Button></Col>
                                        </Row>
                                    </Container>
                            </Col>
                        </Row>
                    </>
                }
            </Container>

            <Toast ref={toast} position="center" />
        </>
    );
}
