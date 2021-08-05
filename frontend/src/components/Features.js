import React from 'react'
import { Container,Row} from 'react-bootstrap'

function Features() {
    return (
        <Container className="py-5 my-3">
            <Row className="justify-content-between">
                <div className="d-flex flex-column text-center my-4 mx-auto px-3">
                    <h4 style={{fontWeight:'600'}}>FREE SHIPPING</h4>
                    <div className="d-flex align-items-center justify-content-center" style={{height:'50px'}}>
                        <span className="py-3 text-muted" style={{fontWeight:'400'}}>On all orders above $30</span>
                    </div>
                </div>
                <div className="d-flex flex-column text-center my-4 mx-auto px-3">
                    <h4 style={{fontWeight:'600'}}>EASY RETURNS</h4>
                    <div className="d-flex align-items-center justify-content-center" style={{height:'50px'}}>
                        <span className="py-3 text-muted" style={{fontWeight:'400'}}>30 daya money back guarantee</span>
                    </div>
                </div>
                <div className="d-flex flex-column text-center my-4 mx-auto px-3">
                    <h4 style={{fontWeight:'600'}}>SECURE PAYMENTS</h4>
                    <div className="d-flex align-items-center justify-content-center" style={{height:'50px'}}>
                        <img src="/static/img/payments.png" alt="payments" width="95%"/>
                    </div>
                </div>
            </Row>
        </Container>
    )
}

export default Features
