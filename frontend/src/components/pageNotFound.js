import React from 'react'
import {Container} from 'react-bootstrap'

function pageNotFound() {
    return (
        <div>
            <Container className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:'75vh'}}>
                <div>
                    <img src="/static/img/page404.svg" style={{width:'500px',maxWidth:'100%'}} alt="Page Not Found"></img>
                </div>
                <h1 className="my-4"style={{color:'#F9A826'}}>Page Not Found</h1>
            </Container>
        </div>
    )
}

export default pageNotFound
