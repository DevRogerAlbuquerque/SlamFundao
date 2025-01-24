import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Footer from '../../components/Footer';
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const Contato = () => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefone: "",
        mensagem: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const scriptURL = "https://script.google.com/macros/s/AKfycbx9tMGXSAplqBCDLV13eOAPrifa7_d_1L5fgXoAwNzCeUeSO1zwIdnN1dQAk1inoB3ZPw/exec";

        try {
          const response = await fetch(scriptURL, {
            method: "POST",
            body: new URLSearchParams(formData),
          });
    
          const result = await response.text();
          alert(result); // Exibe a mensagem de sucesso
        } catch (error) {
          console.error("Erro ao enviar o formulário:", error);
          alert("Ocorreu um erro ao enviar os dados.");
        }
      };

    return (
        <div id="formulario-contato">
            <Container fluid style={{ height: '90vh', marginTop: '10vh' }}>
            <Row>
                    <Col md={12} className="d-flex flex-column align-items-center justify-content-center">
                        <h1 className="roxo text-center">ENTRE EM CONTATO</h1>
                        <p className="text-center" style={{ maxWidth: '600px', color: '#4E2759', fontSize: '20px' }}>
                            Quer levar o Slam Fundão para sua organização, escola ou evento? 
                            <b>Preencha o formulário abaixo e entraremos em contato!</b>
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={8} className="d-flex flex-column align-items-center backgroundRoxo shadow-lg rounded-lg rounded p-3">
                        <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <Row className="mb-4 mt-3">
                                <Col md="6">
                                    <Form.Group controlId="formNome">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Digite seu nome completo"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md="6">
                                    <Form.Group controlId="formTelefone">
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Digite seu telefone com DDD"
                                            name="telefone"
                                            value={formData.telefone}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="formEmail" className="mb-4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Digite seu email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formMensagem" className="mb-4">
                                <Form.Label>Mensagem</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Escreva sua mensagem"
                                    name="mensagem"
                                    value={formData.mensagem}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="warning" type="submit">Enviar Mensagem</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Contato;