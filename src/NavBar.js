import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavBarMenu() {
    return (
        <>
            <Navbar style={{backgroundColor: '#4E2759'}} data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">Slam Fundão</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Produtos</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}