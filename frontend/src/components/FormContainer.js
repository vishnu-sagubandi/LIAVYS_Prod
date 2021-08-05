import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({ children }) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} className="p-5 border" style={{boxShadow: "grey 0px 0px 3px 1px",borderRadius: "10px"}}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer