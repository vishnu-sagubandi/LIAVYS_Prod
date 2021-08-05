import React, { useState} from 'react'
import { Form, Button, Col,Container,Row} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

function PaymentScreen({ history }) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress.address) {
        history.push('/shipping')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <Container fluid className="p-0 m-0">
            <div style={{maxWidth:'1250px',height:'180px',position:'relative'}} className="breadcumb-div d-flex align-items-center mx-auto mb-5">
                <img style={{position:'absolute',top:'50%',right:'8%',height:'90%',transform: 'translate(0, -50%)'}} src="/static/img/bcimage.png" id="breadcumb-image" alt="breadcumb"></img>
                <Container>
                    <h1 style={{fontWeight:'700'}} className="mb-3">CHECKOUT</h1>
                    <Link to="/home" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>HOME /</Link>
                    <Link to="/cart" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>CART /</Link>
                    <span style={{fontSize:"1.1em",fontWeight:'600',color:'#046c3c'}}>Checkout</span>     
                </Container>
            </div>
            <Container className="my-5">
            <CheckoutSteps step1 step2 step3 />
            <Row>
            <Col className="border rounded p-4">
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend' style={{fontWeight:"500"}}>Select Payment Method</Form.Label>
                    <Col className="my-2">
                        <Form.Check
                            checked
                            size="lg"
                            type='radio'
                            label='PayPal'
                            id='paypal'
                            name='paymentMethod'
                            value="Paypal"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                    <Col className="my-2">
                        <Form.Check
                            size="lg"
                            type='radio'
                            label='Credit or Debit Card'
                            id='Card'
                            name='paymentMethod'
                            value='card'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                    <Col className="my-2">
                        <Form.Check
                            size="lg"
                            type='radio'
                            label='Google Pay'
                            id='gpay'
                            value='Gpay'
                            name='paymentMethod'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button 
                    type='submit' 
                    style={{backgroundColor: '#ff3368',outline:'none',border: '2px solid #ff3368'}}
                >
                        Continue
                </Button>
            </Form>
            </Col>
            </Row>
        </Container></Container>
    )
}

export default PaymentScreen
