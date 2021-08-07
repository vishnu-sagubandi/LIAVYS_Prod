import {React,useState,useEffect} from 'react'
import {Container,Row,Col,Image,Tab,Nav,Button,Form,ListGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../css/breadcumb.css'
import Rating from '../components/rating'
import { listProductDetails,createProductReview } from '../actions/productActions'
import { useDispatch,useSelector } from "react-redux"
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen({match,location,history}) {

    // Quantity variable counter
    const [qnty, setQnty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    //Redux state management start here
    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    console.log(product)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate


	useEffect(() => {
        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        
        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match, successProductReview])


    const addToCartHandler=()=>{
        history.push(`/cart/${match.params.id}?qnty=${qnty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(
            match.params.id, {
            rating,
            comment
        }
        ))
    }


    return (
        <Container fluid className="p-0 m-0">
            <div style={{maxWidth:'1250px',height:'180px',position:'relative'}} className="breadcumb-div d-flex align-items-center mx-auto mb-5">
                <img style={{position:'absolute',top:'50%',right:'8%',height:'90%',transform: 'translate(0, -50%)'}} src="/static/img/bcimage.png" id="breadcumb-image" alt="breadcumb"></img>
                <Container>
                    <h1 style={{fontWeight:'700'}} className="mb-3">SHOP</h1>
                    <Link to="/home" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>HOME /</Link>
                    <Link to="/shop" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>SHOP /</Link>
                    <span style={{fontSize:"1.1em",fontWeight:'600',color:'#046c3c'}}>Product</span>     
                </Container>   
            </div>
            <Container style={{margin:'4rem auto'}}>
                {loading?<Loader/>:error?<Message variant="danger" >{error}</Message>:
                <>
                <Row>
                    <Col lg={6} className="mb-5">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <Image src={product.image} rounded width="100%" className="m-1 p-3 border border-warning"/>
                                    </Tab.Pane>
                                    {product.image2 &&
                                    <Tab.Pane eventKey="second">
                                        <Image src={product.image2} rounded width="100%" className="m-1 p-3 border border-warning"/>
                                    </Tab.Pane>}
                                </Tab.Content>
                                </Col>
                                <Col sm={3} className="py-3">
                                <Nav variant="pills" className="flex-row">
                                    <Nav.Item>
                                    <Nav.Link eventKey="first"><div><Image src={product.image} rounded width="90px" className="m-2 border"/></div></Nav.Link>
                                    </Nav.Item>
                                    {product.image2 &&
                                    <Nav.Item>
                                    <Nav.Link eventKey="second"><div><Image src={product.image2} rounded width="90px" className="m-2 border"/></div></Nav.Link>
                                    </Nav.Item>}
                                </Nav>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Col>
                    <Col lg={6} className="py-md-3 pl-lg-5 p-sm-2 mb-5 d-flex align-items-center">
                        <Container fluid>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}/>
                            <h2 className="my-2 py-1 mx-1" style={{fontWeight:'600'}}>{product.name}</h2>
                            <h1 className="mx-2 d-inline-block" style={{fontWeight:'700',fontSize:'2.5rem',color: '#ff3368'}}>${product.new_price}</h1>
                            {product.old_price>0 ? <span className="text-muted" style={{fontWeight:'bold',textDecoration:'line-through',fontSize:'1.3rem'}}>$100</span>:<span></span>}
                            <div className="my-2 mx-1" style={{maxWidth:'270px'}}>
                                <h6><span style={{width:'100px',display:'inline-block'}}>Category</span><span>: {product.category.name}</span></h6>
                                <h6><span style={{width:'100px',display:'inline-block'}}>Availability</span><span style={{fontWeight:'bold'}}>: {product.countInStock > 0 ? 'In Stock': 'Out of Stock'}</span></h6>
                            </div>
                            <div className="border-bottom border-success border-top py-3 px-2 my-4" style={{fontSize:'1.1rem'}}>
                                {product.description}
                            </div>
                            <div>
                                <Form>
                                    <div className="d-flex flex-wrap align-items-center justify-content-around border-success border-bottom pb-4">
                                        <span style={{width:'90px',fontSize:'1.4rem',fontWeight:"500"}}>Quantity:</span>
                                    <div className={`product_count d-inline my-3 mx-1 disable-select ${product.countInStock>0 ? "" : "disabled"}`} >
                                    <span className="number-decrement" onClick={() => qnty >1?setQnty(prevQnty => prevQnty - 1):setQnty(1)}> <i className="fas fa-minus"></i></span>
                                    <input className="input-number" type="text" value={qnty} min={0} max={10} name="quantity" readOnly></input>
                                    <span className="number-increment" onClick={() => (qnty<10 && qnty < product.countInStock)?setQnty(prevQnty => prevQnty + 1):qnty}> <i className="fas fa-plus"></i></span>
                                    </div>
                                    <Button disabled={product.countInStock > 0 ? false: true} onClick={addToCartHandler} style={{backgroundColor: '#ff3368',outline:'none',border: '2px solid #ff3368',borderRadius:'50px',width:'140px',fontSize:'1.1rem',height:'50px'}}>Add to Cart</Button>
                                   </div>
                                </Form>
                            </div>
                        </Container>
                    </Col>
                </Row>
                
                <Row>
                    <Col lg={6}>
                        <h2 className="px-3">Reviews</h2>
                        {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                        <ListGroup variant='flush'>
                        {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-user text-muted fa-2x mr-3"></i>
                                    <div>
                                        <Rating value={review.rating} color='#f8e825' />
                                        <span style={{fontSize:'1.2rem',fontWeight:'500',marginRight:'10px'}}>{review.name}</span>
                                        <span className="text-muted" style={{fontSize:'0.8rem'}}>
                                            {review.createdAt.substring(0, 10)}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-muted mt-4" style={{fontSize:'1.1rem'}}>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        </ListGroup>
                    </Col>
                    <Col lg={6}>
                        <div className="p-3">
                                <h2 className="mb-4">Write a review</h2>

                                {loadingProductReview && <Loader />}
                                {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label><span style={{fontSize:'1.rem'}}>Rating</span></Form.Label>
                                        <Form.Control
                                            as='select'
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                            style={{backgroundColor:'white!important'}}
                                            className="review-form-control"
                                            >
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='comment'>
                                        <Form.Label><span style={{fontSize:'1.rem'}}>Review</span></Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            row='5'
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            className="review-form-control"
                                            placeholder="Comment here"
                                        ></Form.Control>
                                    </Form.Group>

                                    <Button
                                    disabled={loadingProductReview}
                                    type='submit'
                                    variant='primary'
                                    >
                                        Submit
                                    </Button>

                                    </Form>
                                    ) : (
                                    <Message variant='info'>Please <Link to={`/login?redirect=products/${product._id}`}>login</Link> to write a review</Message>
                                )}
                            </div>
                    </Col>
                </Row>
                </>
                }
            </Container>
        </Container>
    )
}

export default ProductScreen
