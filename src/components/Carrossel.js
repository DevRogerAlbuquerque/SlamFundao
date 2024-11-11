import { Card, Carousel } from "react-bootstrap";
import logo from '../imagens/camisaBranca2.jpg'
import roupaAmarela from '../imagens/camisaAmarela.jpg'

export default function Carrossel(props)
{
    return (
        <>
            <Carousel data-bs-theme="dark">
            <Carousel.Item onClick={props.onClick}>
                <img style={{height: props.height || '75vh'}}
                className="w-100"
                src={logo}
                alt="First slide"
                />
                <Carousel.Caption>
                <h5>Camiseta Off-White</h5>
                <p>Confira o Drop de camisetas!</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img style={{height: props.height || '75vh'}}
                className="w-100"
                src={roupaAmarela}
                alt="First slide"
                />
                <Carousel.Caption>
                <h5>Camiseta Amarela</h5>
                <p>Confira o Drop de camisetas!</p>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
        </>
    )
}