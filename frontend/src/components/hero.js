import {React,useEffect,useState} from 'react'
import axios from 'axios'
import {Button, Carousel} from 'react-bootstrap'
import Loader from './Loader'
import {Link} from 'react-router-dom'

function Hero() {

	const [hero,setHero]=useState([])
	const [heroload,setHeroload]=useState(true)

	useEffect(()=>{
		async function fetchHero(){
			const {data} = await axios.get('/api/herosection/1')
			setHero(data)
			setHeroload(false)
		}
		fetchHero();
	},[])


    return (
	<div className='d-flex justify-content-center mb-5' >
		{heroload?<Loader/>:
      <Carousel variant="dark" style={{width:'100%',maxWidth:'1300px'}}>
		  {hero.map(slide => (
		<Carousel.Item interval={2000} key={slide.id} style={{position:'relative'}}>
			<div className='hero-text-div d-flex flex-column justify-content-center px-lg-4 px-xl-5 px-sm-3' style={{position:'absolute',height:'100%',zIndex:'1'}}>
			<span className="mb-3 mt-1 mx-lg-2" style={{fontWeight:'300',fontSize:'1.2rem'}}>{slide.description}</span>
			<span style={{fontWeight:'300',fontSize:'2.6rem',marginRight:'10px'}}>{slide.title}</span>
			<Link to='/shop'>
			<Button className="btn-sm btn-dark mt-4 py-2 mx-lg-2" style={{borderRadius:'0',width:'100px',fontSize:'0.8rem'}}>SHOP NOW</Button></Link>
			</div>
			
			<img
			className="d-block w-100 zoom"
			src={slide.image}
			alt={slide.title}
			style={{height:'75vh'}}
			/>
		</Carousel.Item>))}
		</Carousel>}
		</div>
    )
}
export default Hero
