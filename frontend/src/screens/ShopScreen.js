import {React,useEffect} from 'react'
import {Container,Row,Col,Card,Form} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux"
import {Link} from 'react-router-dom'
import Rating from '../components/rating'
import { listProducts,listCategories } from '../actions/productActions'
import Loader from '../components/Loader'
import SearchBox from '../components/Searchbox'
import Paginate from '../components/Paginate'
import SearchEmpty from '../components/SearchEmpty'
import Message from '../components/Message'

function ShopScreen({history,location}) {

	// Redux state begins here
	const dispatch=useDispatch()

	const productList=useSelector(state=>state.productList)
  const categoryList=useSelector(state=>state.categoryList)
  const {categories}=categoryList

  useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

  
  useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])


	const {error,loading,products,page,pages}=productList

	let keyword = history.location.search

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])


    return (
        <>
        <Container fluid className="p-0 m-0">
            <div style={{maxWidth:'1250px',height:'180px',position:'relative'}} className="breadcumb-div d-flex align-items-center mx-auto my-1">
                <img style={{position:'absolute',top:'50%',right:'8%',height:'90%',transform: 'translate(0, -50%)'}} src="/img/bcimage.png" id="breadcumb-image" alt="breadcumb"></img>
                <Container>
                    <h1 style={{fontWeight:'700'}} className="mb-3">SHOP</h1>
                    <Link to="/home" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>HOME /</Link>
                    <span style={{fontSize:"1.1em",fontWeight:'600',color:'#046c3c'}}>Shop</span>     
                </Container>
            </div>
            <Container className="d-flex justify-content-between py-2 border-info border-bottom flex-wrap">
              <Form className="my-1">
                    <Form.Group controlId='category' className="d-flex align-items-center m-auto">
                      <Form.Label><span style={{fontSize:'1.1rem'}}>Category: </span></Form.Label>
                      <Form.Control
                        as='select'
                        style={{backgroundColor:'white!important'}}
                        className="review-form-control mx-1"
                        onChange={(e)=>history.push(`/shop/?keyword=&category=${e.target.value}&page=1`)}
                        >
                        <option value=''>All</option>
                        {
                          categories.map(x=>(
                            <option value={x._id} key={x._id}>{x.name}</option>
                          ))
                        }
                      </Form.Control>
                    </Form.Group>
                </Form>
                <SearchBox/>
            </Container>
            <Container style={{margin:'4rem auto'}}>
              {loading?<Loader/>:error?<Message variant="danger">{error}</Message>:
                  <Container>
                  {/* Stack the columns on mobile by making one full-width and the other half-width */}
                  {products.length?
                  <Row xs={1} sm={2} md={2} lg={3} xl={4} className="Cards-group">
                  {products.map(product => (
                    <Col key={product._id}>
                    <div className="p-0 m-0">
                    <Link to={`/products/${product._id}`} style={{textDecoration:'none'}}>
                      <Card style={{border:'none',marginBottom:"25px"}}>
                        <Card.Img variant="top" className="product-img" src={product.image2}/>
                        <Card.Img variant="top" className="product-img-top" src={product.image}/>
                        <Card.Body className="p-0 py-4">
                          <h5>{product.name}</h5>
                      <Card.Text as='div' className="text-muted">
                      <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} /></Card.Text>
                          <div className="price py-2">
                      {product.old_price ? <span className="main-price discounted">${product.old_price} </span>:<span></span>}
                      <span className="discounted-price pl-2" style={{fontSize:'1.2rem'}}>${product.new_price}</span>
                      </div>
                        </Card.Body>
                      </Card></Link></div>
                    </Col>
                  ))}
                  </Row>:<SearchEmpty msg="No items found"/>}
                  <Paginate page={page} pages={pages} keyword={keyword}/>
      </Container>}</Container>
    </Container>
    </>
    )
}

export default ShopScreen
