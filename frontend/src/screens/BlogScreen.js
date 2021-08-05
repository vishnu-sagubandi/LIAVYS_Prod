import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SearchEmpty from '../components/SearchEmpty'

function BlogScreen() {
    return (
        <div>
            <Container fluid className="p-0 m-0">
            <div style={{maxWidth:'1250px',height:'180px',position:'relative'}} className="breadcumb-div d-flex align-items-center mx-auto my-1">
                <img style={{position:'absolute',top:'50%',right:'8%',height:'90%',transform: 'translate(0, -50%)'}} src="/static/img/bcimage.png" id="breadcumb-image" alt="breadcumb"></img>
                <Container>
                    <h1 style={{fontWeight:'700'}} className="mb-3">BLOG</h1>
                    <Link to="/home" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>HOME /</Link>
                    <span style={{fontSize:"1.1em",fontWeight:'600',color:'#046c3c'}}>Blog</span>     
                </Container>
            </div>
            </Container>
            <Container className="my-5">
            <SearchEmpty msg="Nothing here"/></Container>
        </div>
    )
}

export default BlogScreen