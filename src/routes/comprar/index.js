import { Col, Container, Row } from "react-bootstrap";

export default function ComprarProduto({
    descricao,
    preco,
    item
})
{
    return (<>
    <Container fluid>
        <Row>
            <Col className="mb-3">
                    <Row>
                        <Col md={6}></Col>
                    </Row>
            </Col>
        </Row>
    </Container>
    </>)
}