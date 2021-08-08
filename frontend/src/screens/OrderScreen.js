import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Card, Container,Toast,Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { getOrderDetails,getPayToken,payOrder,deliverOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import { PAY_TOKEN_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants'
import  DropIn from 'braintree-web-drop-in-react'




function  OrderScreen({ match,history }) {
    const orderId=match.params.id
    const dispatch = useDispatch()

    const [instance,setInstance]=useState({})
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error,loading } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderPay = useSelector(state => state.orderPay)
    const { loading : paymentLoading , error : paymentError , success : paymentSuccess } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const paymentToken=useSelector(state => state.paymentToken)
    const {clientToken,loading:tokenloading,error:tokenerror} = paymentToken

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    const paymentHandler= async ()=>{
        try {
            const { nonce } = await instance.requestPaymentMethod();
            const paymentInfo={
                paymentMethodNonce:nonce,
                amount:order.totalPrice
            }
            dispatch(payOrder(orderId,paymentInfo))            
        } catch (error) {
            console.log(error.message)
        }
    }

    const deliverHandler = () => {
            setModalShow(false)
            dispatch(deliverOrder(order))
    }

    const toLocalTime=(ISOstring)=>{
        let convTimestamp = new Date(ISOstring)
        let date = new Intl.DateTimeFormat('en-GB', { weekday: 'short',year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit',timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,timeZoneName: 'short',hour12: true}).format(convTimestamp)
        return date
    }

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }

        dispatch({ type: PAY_TOKEN_RESET})

        if (!order || order._id !== Number(orderId) || successDeliver) {
            dispatch(getOrderDetails(orderId))
            dispatch({type:ORDER_DELIVER_RESET})
        }
        else if (!order.isPaid){
            dispatch(getPayToken())
        }
    }, [history,dispatch,order,orderId,userInfo,successDeliver])

    useEffect(() => {
        if (paymentSuccess){
            setShow(true)
            dispatch({ type: PAY_TOKEN_RESET})
            dispatch(getOrderDetails(orderId))
        }
    },[dispatch,paymentSuccess,orderId])


    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Body className="text-center">
                <i class="fas fa-exclamation-triangle fa-6x text-warning my-3"></i>
                <h3 class="font-weight-bold">You are marking this order as delivered.</h3>
                <h4>
                Do you want to proceed??
                </h4>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button className="btn-danger text-white px-4" onClick={props.onHide} style={{fontSize:'1.2rem'}}>No</Button>
                <Button className="btn-primary text-white px-4"  onClick={deliverHandler} style={{fontSize:'1.2rem'}}>Yes</Button>
            </Modal.Footer>
            </Modal>
        );
    }



    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Container fluid className="p-0 m-0" style={{position:'relative'}}>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <div style={{maxWidth:'1250px',height:'180px',position:'relative'}} className="breadcumb-div d-flex align-items-center mx-auto mb-5">
                <div style={{position:'absolute',minWidth:'250px',top:'10px',right:'10px',zIndex:'1111'}}>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide >
                    <Toast.Header className="justify-content-between bg-warning text-white">
                        <span className="me-auto" style={{fontSize:'1.2rem'}}>Payment Successful !!</span>
                    </Toast.Header>
                </Toast></div>
                <img style={{position:'absolute',top:'50%',right:'8%',height:'90%',transform: 'translate(0, -50%)'}} src="/static/img/bcimage.png" id="breadcumb-image" alt="breadcumb"></img>
                <Container>
                    <h1 style={{fontWeight:'700'}} className="mb-3">ORDER ID : {orderId}</h1>
                    <Link to="/home" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>HOME /</Link>
                    <Link to="/admin/orderlist" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>ORDERS /</Link>
                    <span style={{fontSize:"1.1em",fontWeight:'600',color:'#046c3c'}}>Details</span>     
                </Container>
            </div>
        <Container className="my-5">
            <Row>
                <Col lg={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className="px-0">
                            <h2>Customer</h2>

                            <p className="my-3 text-muted" style={{fontWeight:'500'}}><strong>Name : </strong> {order.user.name}<br/>
                            <strong>Email : </strong><a className="text-dark" href={`mailto:${order.user.email}`}>{order.user.email}</a><br/>
                            <strong>Placed at : </strong>{toLocalTime( order.createdAt)}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item className="px-0">
                            <h2>SHIPPING</h2>

                            <p className="my-3 text-muted" style={{fontWeight:'500'}}>
                                {order.shippingAddress.name},<br/>
                                {order.shippingAddress.address},  {order.shippingAddress.city},
                                <br/>
                                {order.shippingAddress.state}, {order.shippingAddress.country}-{order.shippingAddress.postalCode},<br/>
                                <strong>Ph : </strong> {order.shippingAddress.phone}.
                            </p>
                            {order.isDelivered ? (
                                        <Message variant='success'>Delivered on {toLocalTime(order.deliveredAt)}</Message>
                                    ) : (
                                            <Message variant='warning'>Not Delivered</Message>
                                        )}
                        </ListGroup.Item>

                        <ListGroup.Item className="px-0">
                            <h2>PAYMENT METHOD</h2>
                            <p className="my-3 text-muted" style={{fontWeight:'500'}}>
                                <strong>Method: </strong>
                                <span style={{fontSize:'1.2rem'}}>{order.paymentMethod}</span>
                            </p>
                            {order.isPaid ? (
                                        <Message variant='success'>Paid on {toLocalTime(order.paidAt)}</Message>
                                    ) : (
                                            <Message variant='warning'>Not Paid</Message>
                                        )}
                        </ListGroup.Item>

                        <ListGroup.Item className="px-0">
                            <h2>ORDER ITEMS</h2>
                            {order.orderItems.length === 0 ? <Message variant='info'>
                                Your order is empty
                            </Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item className="px-0" key={index}>
                                                <Row style={{fontWeight:'500'}}>
                                                    <Col xs={1} className="d-flex align-items-center text-muted">
                                                        {index+1}.
                                                    </Col>

                                                    <Col className="d-flex align-items-center">
                                                        <Link to={`/product/${item.product}`} className="nav-link px-0"><span className="cart-item-name text-muted">{item.name}</span></Link>
                                                    </Col>

                                                    <Col className="d-flex align-items-center text-muted">
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
                            <ListGroup.Item >
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item >
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item >
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item >
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item >
                                <Row>
                                    <Col><strong>Total:</strong></Col>
                                    <Col><strong>${order.totalPrice}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                        <ListGroup.Item >
                                           {tokenloading ||paymentLoading ? (
                                                    <Loader />
                                                ) : tokenerror? (
                                                    <Message variant='danger'>{tokenerror}</Message>
                                                ) : (
                                                !clientToken ? (
                                                <Loader />
                                                ) : !paymentSuccess ?<>
                                                {paymentError && <Message variant='danger'>{paymentError}</Message>}
                                                    <div>
                                                        <DropIn
                                                            options={{ authorization: clientToken,
                                                                venmo: {},
                                                                googlePay: {
                                                                googlePayVersion: 2,
                                                                transactionInfo: {
                                                                totalPriceStatus: 'FINAL',
                                                                totalPrice: order.totalPrice,
                                                                currencyCode: 'USD'
                                                                },
                                                                allowedPaymentMethods: [{
                                                                type: 'CARD',
                                                                parameters: {
                                                                    // We recommend collecting and passing billing address information with all Google Pay transactions as a best practice.
                                                                    billingAddressRequired: true,
                                                                    billingAddressParameters: {
                                                                    format: 'FULL'
                                                                    }
                                                                }
                                                                }]
                                                            } }}
                                                            onInstance={(instance) => setInstance(instance)}
                                                        ></DropIn>
                                                    </div>
                                                   <Button 
                                                   type='button'
                                                   onClick={paymentHandler} 
                                                   className="btn btn-block">Pay</Button></>:<></>
                                                )}
                                        </ListGroup.Item>
                                    )}

                                    {loadingDeliver && <Loader />}
                                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                        <ListGroup.Item>
                                            <Button
                                                type='button'
                                                className='btn btn-block'
                                                onClick={() => setModalShow(true)}
                                            >
                                                Mark As Delivered
                                            </Button>
                                        </ListGroup.Item>
                                    )}

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
        </Container>
    )
}

export default OrderScreen