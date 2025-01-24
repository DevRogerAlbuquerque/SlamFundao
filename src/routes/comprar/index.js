import { Col, Container, Row } from "react-bootstrap";

export default function ComprarProduto({
    descricao,
    preco,
    item
})
{
    const urlGoogleApps = "https://script.google.com/macros/s/AKfycbyBhsI87Mpoz_ar099mIW4pW0H_edx2j9u5aoHbKim2F23KEEnSfNQHD3MiNMUnT7JbvA/exec";
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