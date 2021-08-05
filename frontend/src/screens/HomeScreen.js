import {React} from 'react'
import HomeShop from '../components/homeShop';
import Hotdeal from '../components/hotdeal';
import Hero from '../components/hero';
import Features from '../components/Features';


function HomeScreen() {
    return (
        <>
        <Hero/>
        <HomeShop/>
        <Hotdeal/>
        <Features/>
        </>
    )
}

export default HomeScreen
