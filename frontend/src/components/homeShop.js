import {React,useEffect} from 'react'
import {Container,Row,Col,Card, Button} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux"
import {Link} from 'react-router-dom'
import Rating from './rating'
import { listTopProducts } from '../actions/productActions'
import Loader from './Loader'
import Message from './Message'

function HomeShop() {

	// Redux state begins here
	const dispatch=useDispatch()

	const productTopRated=useSelector(state=>state.productTopRated)

	const {error,loading,topProducts}=productTopRated

	useEffect(()=>{
		if (!topProducts.length){
		dispatch(listTopProducts())}

	},[dispatch,topProducts.length])


    return (
        <>
        <div className="section-title-container mb-70 mb-md-50 mb-sm-50">
		<div className="container">
			<div className="row mb-75">
				<div className="col-6">
					<div className="section-title__label section-title__label-style2 section-title__label--left section-title__label-style3--left">
						<p>SS-2018 <span className="line">84</span></p>
					</div>
				</div>

				<div className="col-6 text-right">
					<div className="section-title__label  section-title__label-style2 section-title__label--right section-title__label-style3--right">
						<p>INNOVATIVE </p><p> DESIGN</p>
					</div>
				</div>

			</div>
			<div className="row">
				<div className="col-lg-12">

					<div className="section-title section-title--one text-center">
						<h1>Clever &amp; unique ideas</h1>
					</div>

				</div>
			</div>
		</div>
	</div>
    <div className="product-carousel-container mb-50 mb-md-30 mb-sm-30">
		{loading?<Loader/>:error?<Message variant="danger" >{error}</Message>:
        <Container>
  {/* Stack the columns on mobile by making one full-width and the other half-width */}
  <Row xs={1} sm={2} md={3} lg={4} className="Cards-group">
  {topProducts.map(product => (
    <Col key={product._id}>
    <div className="p-0 m-0">
    <Link to={`/products/${product._id}`} style={{textDecoration:'none'}}>
      <Card style={{border:'none',marginBottom:"25px"}}>
        <Card.Img variant="top" className="product-img" src={product.image}/>
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
</Row>
<div className="d-flex justify-content-end">
	<Link to="/shop">
<Button className="btn-info float-right">More Products</Button></Link></div>
</Container>}
    </div>
    </>
    )
}

export default HomeShop
