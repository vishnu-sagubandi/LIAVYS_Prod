import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Container, Spinner} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import '../css/login.css'

function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <Container className="p-0" fluid="lg" style={{background: "#ededeb"}}>
        <Container className="p-0 w-100 d-flex align-items-center" fluid="lg" style={{minHeight:'85vh',position:'relative',fontFamily:'"Poppins",cursive'}}>
            <div>
            <img className="wave" src="/static/img/wave.png" alt="wave png"></img></div>
            <Container>
            <Row>
                <Col md={7} lg={7} className="d-none d-sm-none d-md-block align-items-center justify-content-center" stle={{display:'none'}}><img src="/static/img/bg.svg" alt="bg svg" width="70%" className="m-auto d-block w-100 w-lg-75"/></Col>
                <Col md={5} lg={5} sm={12} className="d-flex align-items-center justify-content-center text-center login-content">
                    <form onSubmit={submitHandler} className="login-form">
                        <img src="/static/img/avatar.svg" width="40%" alt="avatar svg" className="my-3" style={{maxWidth:'100px'}}/>
                        <h2 className="title my-3">Welcome</h2>
                        {error && <Message variant="danger">{error}</Message>}
                        <div className="input-div one my-3">
                        <div className="i">
                                <i className="fas fa-user"></i>
                        </div>
                        <div className="div" style={{minWidth:'240px'}}>
                                <input autoComplete="username" required type="email" placeholder="Enter Email" value={email} className="input" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        </div>
                        <div className="input-div pass my-3">
                        <div className="i"> 
                                <i className="fas fa-lock"></i>
                        </div>
                        <div className="div">
                                <input autoComplete="current-password" required type="password" placeholder="Enter Password" value={password} className="input" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        </div>
                        <Button className="login-btn" value="Login" type="submit">Login {loading ? <Spinner animation="border" variant="light"/> : "" }</Button>
                        <Link className="logindiv-links" to={ redirect? `/register?redirect=${redirect}`:'register/' }>New customer?</Link>
                    </form>
                </Col>
            </Row></Container>
        </Container></Container>
    )
}

export default LoginScreen