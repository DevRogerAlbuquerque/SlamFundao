import { Card } from "react-bootstrap";

export default function GrupoCard(props)
{
    return (
        <>
            <Card className="mt-10 shadow-lg">
                <Card.Header style={{border: 'hidden', color: 'purple', fontWeight: 'bold'}} >{props.header}</Card.Header>
                <Card.Body style={{height: props.height}} onClick={props.onClick}>
                    <div style={props.styleBody}>
                    {props.children}
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}