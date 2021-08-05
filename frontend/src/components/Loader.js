import React from 'react'
import { Spinner } from "react-bootstrap";
function Loader() {
    return (
        <Spinner animation="border" variant="warning" style={{
            height:'100px',
            width:'100px',
            margin:'3rem auto',
            display:'block'
        }}><span className="sr-only">Loading...</span></Spinner>
    )
}

export default Loader
