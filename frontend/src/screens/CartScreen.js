import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card,Container} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import '../css/breadcumb.css'

function CartScreen({match,history,location}) {
    const productId=match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id))
    }
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const checkoutHandler=()=>{
        if (userInfo) {
            history.push("/shipping")
        }else{
            history.push('/login?redirect=shipping')
        }
    }

    return (
        <Container fluid className="p-0 mb-5">
            <div style={{maxWidth:'1250px',height:'180px',position:'relative'}} className="breadcumb-div d-flex align-items-center mx-auto mb-5">
                <img style={{position:'absolute',top:'50%',right:'8%',height:'90%',transform: 'translate(0, -50%)'}} src="img/bcimage.png" id="breadcumb-image" alt="breadcumb"></img>
                <Container>
                    <h1 style={{fontWeight:'700'}} className="mb-3">SHOPPING CART</h1>
                    <Link to="/home" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>HOME /</Link> 
                    <span style={{fontSize:"1.1em",fontWeight:'600',color:'#046c3c'}}>Cart</span>     
                </Container>
            </div>
            <Container>
            <Row>
            <Col lg={8}>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                        <ListGroup>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row className="align-items-center">
                                        <Col md={2} className="my-2">
                                            <Image className="border border-secondary p-1"src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={4} className="my-2">
                                            <Link to={`/products/${item.product}`} className="nav-link"><span className="cart-item-name text-muted">{item.name}</span></Link>
                                        </Col>

                                        <Col md={2} className="my-2">
                                            <span className="discounted-price">${item.price}</span>
                                        </Col>

                                        <Col md={3} className="pl-2 my-2">
                                            <div className={`product_count d-inline py-2 my-3 mx-auto disable-select ${item.countInStock>0 ? "" : "disabled"}`} >
                                            <span className="number-decrement" onClick={() => item.qty >1?dispatch(addToCart(item.product,(item.qty-1))):item.qty}> <i className="fas fa-minus"></i></span>
                                            <input className="input-number" type="text" value={item.qty} min={0} max={10} name="quantity" readOnly style={{fontSize:'1.2rem'}}></input>
                                            <span className="number-increment" onClick={() => (item.qty<10 && item.qty < item.countInStock)?dispatch(addToCart(item.product,(item.qty+1))):item.qty}> <i className="fas fa-plus"></i></span>
                                    </div>
                                        </Col>

                                        <Col md={1} className="px-1 my-2">
                                            <Button
                                                type='button'
                                                variant='light'
                                                onClick={()=>removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
            </Col>

            <Col lg={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2 className="my-2">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            <div className="d-flex justify-content-between py-2 align-items-center">
                                <span className="text-muted"style={{dispaly:'inline-block',fontSize:'20px',fontWeight:'600'}}>Total :</span>
                                <h1 style={{fontWeight:'700',fontSize:'2.2rem',color: '#ff3368'}}>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h1>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            style={{backgroundColor: '#ff3368',outline:'none',border: '2px solid #ff3368',fontSize:'1.1rem'}}
                            onClick={()=>checkoutHandler()}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>


                </Card>
            </Col>
        </Row>
            </Container>
        </Container>
    )
}

export default CartScreen
