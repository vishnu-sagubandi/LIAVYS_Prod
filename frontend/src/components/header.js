import React,{useState} from 'react'
import {Navbar,Nav,NavDropdown,Container} from 'react-bootstrap'
import '../css/header.css'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

function Header() {

    const [expanded, setExpanded] = useState(false);

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header style={{width: '100%'}}>
        <Navbar bg="white" expand="lg" expanded={expanded}>
            <Container className="p-0">
                <LinkContainer to='/home'>
                <Navbar.Brand className="p-0"><img src="/static/img/liavys.svg" alt="Logo" height='55px' className="navbar-brand-logo" />
                
                </Navbar.Brand></LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
                <Nav className="me-auto basic-navbar-nav py-md-3">
                    <LinkContainer to="/home" onClick={() => setExpanded(false)}>
                    <Nav.Link className="mx-3 text-dark" style={{ color: 'rgb(50, 50, 50)', fontSize: '17px' }}>
                    Home
                    </Nav.Link></LinkContainer>
                <LinkContainer to="/shop" onClick={() => setExpanded(false)}>
                    <Nav.Link className="mx-3 text-dark" style={{ color: 'rgb(50, 50, 50)', fontSize: '17px' }}>
                    Shop
                    </Nav.Link></LinkContainer>
                <LinkContainer to="/blog" onClick={() => setExpanded(false)}>
                    <Nav.Link className="mx-3 text-dark" style={{ color: 'rgb(50, 50, 50)', fontSize: '17px' }}>
                    Blog
                    </Nav.Link></LinkContainer>
                <LinkContainer to="/contact" onClick={() => setExpanded(false)}>
                    <Nav.Link className="mx-3 text-dark" style={{ color: 'rgb(50, 50, 50)', fontSize: '17px' }}>
                    Contact
                    </Nav.Link></LinkContainer>
                </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse id="basic-navbar-nav" className="flex-grow-0">
                  <Nav className="me-auto text-dark nav-auth-group">
                    {userInfo ? (
                      <NavDropdown title={userInfo.name} className="pl-lg-0 pl-3" id='username' >
                        <LinkContainer to='/profile' onClick={() => setExpanded(false)}>
                          <NavDropdown.Item className="text-light">Profile</NavDropdown.Item>
                        </LinkContainer>

                        <NavDropdown.Item onClick={logoutHandler} className="text-light">Logout</NavDropdown.Item>

                      </NavDropdown>
                      ) : (
                        <LinkContainer to="/login" onClick={() => setExpanded(false)}>
                          <Nav.Link className="mx-3 text-dark" style={{ color: 'rgb(50, 50, 50)', fontSize: '17px' }}>
                            Login
                          </Nav.Link></LinkContainer>)}
                      <LinkContainer to='/cart' onClick={() => setExpanded(false)}>
                        <Nav.Link className="mx-3 text-dark" style={{ color: 'rgb(50, 50, 50)', fontSize: '17px' }}>
                          <i className="fas fa-shopping-cart"></i>
                        </Nav.Link></LinkContainer>

                        {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenu' className="pl-lg-0 pl-3">
                                    <LinkContainer to='/admin/userlist' onClick={() => setExpanded(false)}>
                                        <NavDropdown.Item className="text-light">Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist' onClick={() => setExpanded(false)}>
                                        <NavDropdown.Item className="text-light">Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist' onClick={() => setExpanded(false)}>
                                        <NavDropdown.Item className="text-light">Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </header>
    )
}

export default Header
