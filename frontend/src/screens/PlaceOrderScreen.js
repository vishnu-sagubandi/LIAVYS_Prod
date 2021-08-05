import React, {useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card, Container,Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen({ history }) {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success,loading } = orderCreate

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.02) * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const placeOrder=()=>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    if (!cart.paymentMethod) {
        history.push('/payment')
    }

     useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [dispatch,success, history,order])

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
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col lg={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>SHIPPING</h2>

                            <p className="my-3 text-muted" style={{fontWeight:'500'}}>
                                {cart.shippingAddress.name},<br/>
                                {cart.shippingAddress.address},  {cart.shippingAddress.city},
                                <br/>
                                {cart.shippingAddress.state}, {cart.shippingAddress.country}-{cart.shippingAddress.postalCode},<br/>
                                <strong>Ph : </strong> {cart.shippingAddress.phone}.
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>PAYMENT METHOD</h2>
                            <p className="my-3 text-muted" >
                                <strong>Method: </strong>
                                <span style={{fontSize:'1.2rem'}}>{cart.paymentMethod}</span>
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>ORDER ITEMS</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Your cart is empty
                            </Message> : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item className="px-0" key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col className="d-flex align-items-center">
                                                        <Link to={`/product/${item.product}`} className="nav-link px-0"><span className="cart-item-name text-muted">{item.name}</span></Link>
                                                    </Col>

                                                    <Col md={4} className="d-flex align-items-center">
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col lg={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col><strong>Total:</strong></Col>
                                    <Col><strong>${cart.totalPrice}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            
                                {error && <ListGroup.Item> <Message variant='danger'>{error}</Message> </ListGroup.Item>}
                            
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems.length === 0}
                                    style={{backgroundColor: '#ff3368',outline:'none',border: '2px solid #ff3368'}}
                                    onClick={placeOrder}
                                >
                                    Place Order {loading?<Spinner animation="border" size='sm' variant="warning"></Spinner>:''}
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
        </Container>
    )
}

export default PlaceOrderScreen