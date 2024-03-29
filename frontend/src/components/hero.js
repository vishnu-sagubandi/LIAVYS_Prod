import {React,useEffect} from 'react'
import {Button, Carousel} from 'react-bootstrap'
import Loader from './Loader'
import {Link} from 'react-router-dom'
import { getHeroCarousel } from '../actions/productActions'
import { useDispatch,useSelector } from "react-redux"
import Message from './Message'

function Hero() {

	const dispatch=useDispatch()

	const heroCarousel=useSelector(state=>state.heroCarousel)

	const {error,loading,hero}=heroCarousel

	useEffect(()=>{
		if (!hero.length){
			dispatch(getHeroCarousel())
		}
	},[dispatch,hero.length])


    return (
	<div className='d-flex justify-content-center mb-5' >
		{loading?<Loader/>:error?<Message variant="danger" >{error}</Message>:
      <Carousel variant="dark" style={{width:'100%',maxWidth:'1300px'}}>
		  {hero.map((slide,index) => ( !(index% 2)?
		<Carousel.Item interval={2000} key={slide.id} style={{position:'relative'}}>
			<div className='hero-text-div d-flex flex-column justify-content-center px-lg-4 px-xl-5 px-sm-3' style={{position:'absolute',height:'100%',zIndex:'1'}}>
			<span className="mb-3 mt-1 mx-lg-2" style={{fontWeight:'350',fontSize:'1.2rem'}}>{slide.description}</span>
			<span style={{fontWeight:'330',fontSize:'2.7rem',marginRight:'15px'}}>{slide.title}</span>
			<Link to='/shop'>
			<Button className="btn-sm btn-dark mt-4 py-2 mx-lg-2" style={{borderRadius:'0',width:'100px',fontSize:'0.8rem'}}>SHOP NOW</Button></Link>
			</div>
			
			<img
			className="d-block w-100 zoom"
			src={slide.image}
			alt={slide.title}
			style={{height:'75vh'}}
			/>
		</Carousel.Item>:
		<Carousel.Item interval={2000} key={slide.id} style={{position:'relative'}}>
			<div className='hero-text-div text-right d-flex flex-column justify-content-center px-lg-4 px-xl-5 px-sm-3' style={{position:'absolute',height:'100%',zIndex:'1',right:'0'}}>
			<span className="mb-3 mt-1 mx-lg-2" style={{fontWeight:'350',fontSize:'1.2rem'}}>{slide.description}</span>
			<span style={{fontWeight:'330',fontSize:'2.7rem',marginLeft:'15px'}}>{slide.title}</span>
			<Link to='/shop'>
			<Button className="btn-sm btn-dark mt-4 py-2 mx-lg-2" style={{borderRadius:'0',width:'100px',fontSize:'0.8rem'}}>SHOP NOW</Button></Link>
			</div>
			
			<img
			className="d-block w-100 zoom"
			src={slide.image}
			alt={slide.title}
			style={{height:'75vh'}}
			/>
		</Carousel.Item>

		))}
		</Carousel>}
		</div>
    )
}
export default Hero
