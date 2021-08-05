import {React,useState,useEffect} from 'react'
import {Container,Form,Button,Col,Row} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import '../css/breadcumb.css'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen({history}) {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push("/login?redirect=shipping")
        }
    }, [history, userInfo])

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [name,setName]=useState(shippingAddress.name)
    const [phone,setPhone]=useState(shippingAddress.phone)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [state, setState] = useState(shippingAddress.state)

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({ name,phone,address, city, postalCode, country,state }))
        history.push('/payment')
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
                <CheckoutSteps step1 step2 />
                <h1>Shipping Address</h1>
                <Form onSubmit={submitHandler}>
                    <Row >
                        <Form.Group as={Col} md="6" controlId='name'>
                            <Form.Label>Name :</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                placeholder='Enter name'
                                value={name ? name : ''}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId='contact'>
                            <Form.Label>Contact No :</Form.Label>
                            <Form.Control
                                required
                                type='text'
                                placeholder='Enter phone number'
                                value={phone ? phone : ''}
                                onChange={(e) => setPhone(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Row>

                    <Form.Group controlId='address'>
                        <Form.Label>Address :</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter address'
                            value={address ? address : ''}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Row>
                    <Form.Group as={Col} md="6" controlId='city'>
                        <Form.Label>City :</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter city'
                            value={city ? city : ''}
                            onChange={(e) => setCity(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId='postalCode'>
                        <Form.Label>Postal Code :</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter postal code'
                            value={postalCode ? postalCode : ''}
                            onChange={(e) => setPostalCode(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group></Row>
                    <Row>
                    <Form.Group as={Col} md="6" controlId='country'>
                        <Form.Label>State :</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter country'
                            value={state ? state : ''}
                            onChange={(e) => setState(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId='country'>
                        <Form.Label>Country :</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter country'
                            value={country ? country : ''}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    </Row>

                    <Button type='submit' style={{backgroundColor: '#ff3368',outline:'none',border: '2px solid #ff3368'}}>
                        Continue
                    </Button>
                </Form>
            </Container>
            

        </Container>
    )
}

export default ShippingScreen
