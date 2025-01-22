import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import Footer from '../../components/Footer';
import logo from '../../imagens/logobanner.png';
import coroa from '../../imagens/coroa.png';
import { useNavigate } from "react-router-dom";
import primeiraEdicao from '../../imagens/imagemEdicao.jpg';
import comoSurgiu from '../../imagens/comoSurgiu.jpg';
import oficinaMaior from '../../imagens/oficinaMaior.jpg';
import oficinaPimentas from '../../imagens/oficinaPimentas.jpg';
import imagemOficina from '../../imagens/imagemOficina.jpg';

export const SobreNos = () => {
    const navigate = useNavigate();
    return (
        <div id="home">
            <Container fluid style={{ height: '90vh', marginTop: '10vh' }} className="gradienteEscuro">
                <Row style={{ height: '92vh' }}>
                    <Col md={12} className="d-flex flex-column align-items-center justify-content-center">
                        <img height={'200px'} src={logo} alt="Logo Slam Fundão" />
                        <h5>Do Fundão para o fundão</h5>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{ height: '100vh' }}>
                <Row>
                    <h1 className="roxo text-center">O QUE É O SLAM FUNDÃO?</h1>
                </Row>
                <Row>
                <Col sm={12} md={6} className="d-flex flex-column align-items-center justify-content-center" >
                    
                            <img style={{border: '15px solid #4E2759', borderRadius: '5%'}}
                                className="w-100 border-rounded"
                                src={primeiraEdicao}
                                alt="First slide" />
                            </Col>
                    <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
                        <p style={{ textAlign: 'center', maxWidth: '800px', fontSize: '20px', color: '#4E2759' }}>
                            O Slam Fundão é uma batalha de poesias que nasce como um <b>espaço de resistência e expressão cultural</b> nas periferias de Guarulhos. 
                            Criado para <b>democratizar o acesso à cultura e à literatura</b>, o Slam é voltado principalmente para jovens e adolescentes, 
                            oferecendo uma plataforma onde a poesia falada se torna uma ferramenta poderosa para expressar sentimentos, vivências e perspectivas. 
                            Mais do que um evento, o <b>Slam Fundão é um encontro de vozes que transformam a realidade por meio da arte</b> e fortalecem a identidade 
                            de quem antes tinha o acesso à cultura limitado ou restrito.
                        </p>
                    </Col>
                </Row>
            </Container>
            <Container fluid style={{ height: '100vh' }}>
                <Row>
                    <h1 className="roxo text-center">COMO SURGIU?</h1>
                </Row>
                <Row>
                    <Col md={8} className="d-flex flex-column align-items-center justify-content-center">
                        <p style={{ textAlign: 'center', maxWidth: '800px', fontSize: '20px', color: '#4E2759' }}>
                        O Slam Fundão nasce de uma<b> necessidade urgente de democratizar</b> o acesso à cultura e 
                        à literatura nas periferias de Guarulhos. Criado como uma 
                        <b> resposta ao isolamento cultural</b> enfrentado por muitos jovens e adolescentes, o Slam oferece 
                        um<b> espaço seguro e inclusivo</b> onde a poesia falada se torna um instrumento 
                        poderoso para a expressão de sentimentos, vivências e perspectivas.  
                        <b>Com o objetivo de levar voz e lazer para as comunidades periféricas</b>, o Slam Fundão realizou sua primeira 
                        edição no início de 2023. 
                        Desde então, tem transformado o cenário cultural da região, promovendo <b>encontros que não apenas celebram 
                        a arte, mas também fortalecem os laços comunitários</b>, proporcionando oportunidades para que talentos emergentes se destaquem e compartilhem suas histórias através da poesia.
                        </p>
                    </Col>
                    <Col sm={12} md={4} className="d-flex flex-column align-items-center justify-content-center" >
                        <img style={{height: '75vh', border: '15px solid #4E2759', borderRadius: '5%'}}
                                className="w-100 border-rounded"
                                src={comoSurgiu}
                                alt="First slide" />
                    </Col>
                </Row>
            </Container>

            <Container fluid style={{ height: '100vh' }}>
                <Row>
                    <h1 className="roxo text-center">EDIÇÕES</h1>
                </Row>
                <Row>
                    
                    <Col sm={12} md={4} className="d-flex flex-column align-items-center justify-content-center">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.089239685564!2d-46.40092998445125!3d-23.710245484610684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8e0b5d86f2b7%3A0xef5b83f93d1b6d8c!2sPra%C3%A7a%20Estrela%2C%20Cidade%20Soberana%2C%20Guarulhos%20-%20SP!5e0!3m2!1sen!2sbr!4v1697816407156!5m2!1sen!2sbr"
                            width="100%"
                            height="100%"
                            style={{border: '15px solid #4E2759', borderRadius: '5%' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Col>
                    <Col md={8} className="d-flex flex-column align-items-center justify-content-center">
                        <p style={{ textAlign: 'center', maxWidth: '800px', fontSize: '20px', color: '#4E2759' }}>
                        As edições do Slam Fundão acontecem eventualmente na <b>Praça Estrela, localizada no bairro Soberana, em Guarulhos</b>. 
                        Esse espaço é o coração do nosso movimento, onde a comunidade se reúne para celebrar a poesia e a arte nas ruas da periferia.
                        </p>

                        <h3 className="roxo">EDIÇÕES MENSAIS</h3>
                        <p style={{ textAlign: 'center', maxWidth: '800px', fontSize: '20px', color: '#4E2759' }}>
                        Todo mês, realizamos edições onde poetas de diversas vivências e estilos compartilham suas palavras. 
                        <b>Cada edição consagra um campeão mensal, que avança para disputar a grande final do ano</b>.
                        </p>

                        <h3 className="roxo">EDIÇÃO FINAL</h3>
                        <p style={{ textAlign: 'center', maxWidth: '800px', fontSize: '20px', color: '#4E2759' }}>
                        No final do ano, promovemos a tão esperada edição final, onde os campeões mensais se enfrentam em uma emocionante batalha de poesias. 
                        <b>O vencedor dessa edição especial garante sua vaga no Slam Estadual</b>, representando o Slam Fundão em um cenário ainda maior, 
                        levando consigo a força e a voz da periferia.
                        </p>
                    </Col>
                </Row>

            </Container>

            <Container fluid style={{ height: '200vh' }}>
                <Row>
                    <h1 className="roxo text-center">OFICINAS</h1>
                    <h3 className="roxo text-center">VOCÊ SABIA QUE PODE TER O FUNDÃO NA SUA ORGANIZAÇÃO?</h3>
                </Row>
                <Row>
    {/* Coluna de Texto */}
    <Col md={12} className="d-flex flex-column align-items-center justify-content-center mb-4">
        <p
            style={{
                textAlign: 'center',
                maxWidth: '800px',
                fontSize: '20px',
                color: '#4E2759',
            }}
        >
            O Slam Fundão também atua fora das batalhas, promovendo <b>oficinas de escrita criativa</b> para ensinar e inspirar mais pessoas, 
            principalmente jovens estudantes. Essas oficinas são <b>um espaço onde a poesia se torna acessível</b>, e novas formas de expressão são exploradas, incentivando o autoconhecimento e a valorização das histórias de cada participante.

            Até o momento, o Slam Fundão já realizou<b> mais de 20 oficinas em escolas</b>, ONGs, universidades e CEUs. 
            Entre as instituições atendidas, destacam-se as escolas estaduais Grot, Idalina e Storopoli,
             além de muitas outras localizadas em bairros periféricos.

            Com essas iniciativas, <b>buscamos levar a poesia e a literatura para quem mais precisa</b>, 
            fortalecendo a criatividade, a autoestima e a conexão com a comunidade. 
        </p>
        <h5 className="roxo text-center">Se você é aluno, professor ou parte de uma organização e deseja levar nossas oficinas para o seu espaço, entre em contato e venha fazer parte dessa transformação cultural!</h5>
    </Col>

    {/* Coluna com as Imagens */}
    <Col sm={12} md={12} className="d-flex flex-column align-items-center justify-content-center">
        <Container fluid>
            <Row className="d-flex justify-content-center align-items-end">
                {/* Imagem menor à esquerda */}
                <Col xs={4} md={3} className="d-flex justify-content-end">
                    <img
                        src={imagemOficina}
                        alt="Imagem à esquerda"
                        style={{
                            width: '80%',
                            height: 'auto',border: '15px solid #4E2759', borderRadius: '5%',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            transform: 'translateY(20%)',
                        }}
                    />
                </Col>

                {/* Imagem central maior */}
                <Col xs={4} md={6} className="d-flex justify-content-center">
                    <img
                        src={oficinaMaior}
                        alt="Imagem central"
                        style={{
                            width: '100%',
                            height: 'auto', border: '15px solid #4E2759', borderRadius: '5%',
                            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
                            zIndex: 1,
                        }}
                    />
                </Col>

                {/* Imagem menor à direita */}
                <Col xs={4} md={3} className="d-flex justify-content-start">
                    <img
                        src={oficinaPimentas}
                        alt="Imagem à direita"
                        style={{
                            width: '80%',
                            height: 'auto',border: '15px solid #4E2759', borderRadius: '5%',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                            transform: 'translateY(20%)',
                        }}
                    />
                </Col>
            </Row>
        </Container>
    </Col>
</Row>

            </Container>
        </div>
    );
}

export default SobreNos;
