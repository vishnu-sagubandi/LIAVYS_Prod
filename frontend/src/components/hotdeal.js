import React, { useState,useRef} from 'react'
import {Row,Col, Container,Button} from "react-bootstrap"



function Hotdeal() {

    const ref = useRef(null)

    const intialStyles={zIndex:'1'}

    const [styles, setStyles] = useState(intialStyles)
    const [width,setWidth]=useState(undefined)
    const [height,setHeight]=useState(undefined)

    function parallaxMove(e) {         
            setWidth(ref.current.offsetWidth)
            setHeight(ref.current.offsetHeight)
            const centreY=ref.current.getBoundingClientRect().top+height/2
            const centreX=ref.current.getBoundingClientRect().left+width/2
            const x=(e.clientX-centreX)/4
            const y=(e.clientY-centreY)/4
            setStyles({
                zIndex:'1',
                transform:`translate(${-x}px,${-y}px)`,
                transition:'0.05s' ,        
            })
    }
    function resetStyles(e) {
            setStyles({
                zIndex:'1',
                transform:`translate(0px,0px)`,
                transition:'0.1s',
            })
    }

    return (
        <div className="hotdeal" style={{paddingBottom:"30px"}}>
            <Container fluid>
                <Row style={{minHeight:'70vh'}}>   
                    <Col lg={6} md={12} className="hotdeal-img-div heigth-100 d-flex align-items-center justify-content-center py-5" ref={ref} onMouseMove={parallaxMove} onMouseOut={resetStyles}>
                            <img src="/static/img/circle-round.png" className="hotdeal-bg-img" alt="hotdeal item bg"></img>
                            <img src="/static/img/cabinet.png" className="hotdeal-img w-100 pl-lg-5 zoom" style={styles} alt="hotdeal item"></img>
                    </Col>
                    <Col lg={6} md={12} className="d-flex align-items-center justify-content-center">
                        <div className="countdown-wrapper text-center">
                            <h1 className="mb-5" style={{fontWeight:"600"}}>Deal of the day</h1>
                            <Container fluid className="mb-5">
                            <Row className="text-muted">
                                <Col className="d-flex flex-column"><h2 className="text-muted">03</h2><span>DAYS</span></Col>
                                <Col className="d-flex flex-column"><h2 className="text-muted">16</h2><span>HOURS</span></Col>
                                <Col className="d-flex flex-column"><h2 className="text-muted">22</h2><span>MINUTES</span></Col>
                                <Col className="d-flex flex-column"><h2 className="text-muted">45</h2><span>SECONDS</span></Col>
                            </Row>
                            </Container>
                            <Button style={{backgroundColor: '#ff3368',outline:'none',border: '2px solid #ff3368'}}>Buy now</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Hotdeal
