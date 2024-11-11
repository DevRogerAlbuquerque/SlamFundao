import { Col, Container, Row } from "react-bootstrap";

export default function Grid(props)
{
    return(
        <>
            <div className="container-fluid" id="grid" style={{width: '100%', marginTop: '80px', height: '80vh'}}>
                {props.children}
            </div>
        </>
    )
}