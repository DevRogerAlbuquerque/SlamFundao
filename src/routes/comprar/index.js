import { useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import ReactInputMask from "react-input-mask";
import { useOutletContext } from "react-router-dom";

export default function ComprarProduto() {
    const { itensCarrinho } = useOutletContext();
    const [validated, setValidated] = useState(false);
    let form;
    const setForm = (element) => form = element;
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefone: "",
        mensagem: "",
    });
    const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 3 }
    const formatNumber = new Intl.NumberFormat('pt-BR', options);

    const [confirmacaoPendente, setConfirmacaoPendente] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const valorTotal = itensCarrinho.reduce((total, item) => total + item.valor * item.quantidade, 0);

    const concluirCompra = () => 
    {
        if(!form.checkValidity())
            setValidated(true);

        setValidated(false);
        setConfirmacaoPendente(false);
    }
    return (
        <>
            {confirmacaoPendente && <Container fluid style={{ height: '90vh', marginTop: '10vh' }}>
                <Row>
                    <Col md={8} sm={12} className="p-4 rounded order-md-first order-sm-last d-flex flex-column align-items-center justify-content-center">
                        <h2 className="roxo">Finalize sua Compra <FaCartShopping /></h2>
                        <Form noValidate ref={setForm} validated={validated} style={{ width: '100%' }}>
                            <Row className="mb-3 mt-3">
                                <Col md="6">
                                    <Form.Group controlId="formNome">
                                        <Form.Label className="roxo">Nome</Form.Label>
                                        <Form.Control
                                            type="text" className="bordaRoxa roxo backgroundAmarelo"
                                            placeholder="Digite seu nome completo"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleChange}
                                            required={true}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group controlId="formTelefone">
                                        <Form.Label className="roxo">Telefone</Form.Label>
                                        <Form.Control className="bordaRoxa backgroundAmarelo roxo"
                                            type="tel"
                                            placeholder="Digite seu telefone com DDD"
                                            name="telefone"
                                            as={ReactInputMask}
                                            mask="(**) *****-****"
                                            value={formData.telefone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col><Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label className="roxo">Email</Form.Label>
                                <Form.Control
                                    type="email" className="bordaRoxa backgroundAmarelo roxo"
                                    placeholder="Digite seu email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group></Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Form.Group controlId="formNome">
                                        <Form.Label className="roxo">CPF</Form.Label>
                                        <Form.Control
                                            type="text" className="bordaRoxa backgroundAmarelo roxo"
                                            placeholder="___.___.___-__"
                                            name="cpf"
                                            as={ReactInputMask}
                                            mask="***.***.***-**"
                                            value={formData.cpf}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formDataNascimento" className="mb-4">
                                        <Form.Label className="roxo">Data de Nascimento</Form.Label>
                                        <Form.Control
                                            type="date" className="bordaRoxa backgroundAmarelo roxo"
                                            placeholder="__/__/____"
                                            name="dataNascimento"
                                            value={formData.dataNascimento}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col md={4} sm={12} className="p-4 order-md-last order-sm-first backgroundRoxo d-flex flex-column" style={{ borderRadius: '15%' }}>
                        <h2 className="amarelo text-center">Produtos no Carrinho</h2>
                        {itensCarrinho.map((produto, index) => (
                            <Row key={index} className="mb-3 backgroundAmarelo bordaRoxa rounded">
                                <Col>
                                    <div className="d-flex justify-content-between">
                                        <div className="p-3">
                                            <h4 className="roxo">{produto.nome}</h4>
                                            <p className="mb-0 roxo">Quantidade: {produto.quantidade}</p>
                                            <p className="mb-0 roxo">Preço Unitário: R$ {produto.valor}</p>
                                            <p className="mb-0 roxo">Total: R$ {produto.quantidade * produto.valor}</p>
                                        </div>

                                        <img
                                            height="80"
                                            width="80"
                                            className="img-fluid rounded m-2 bordaRoxa"
                                            src={produto.imagem}
                                            style={{ border: '2px solid' }}
                                            alt={`Imagem de ${produto.nome}`}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        ))}
                        <Row className="mt-auto">
                            <Col>
                                <div className="text-center">
                                    <Button onClick={concluirCompra}
                                        disabled={!itensCarrinho.length}
                                        size="lg"
                                        className="backgroundAmarelo bordaAmarela">
                                        <FaCheckCircle /> FINALIZAR COMPRA - {formatNumber.format(valorTotal)}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </Container>}
            {!confirmacaoPendente && 
                <Container fluid>

                </Container>
            }
        </>
    );
}
