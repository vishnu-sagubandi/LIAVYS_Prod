import React, { useState,useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Container,Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts,deleteProduct } from '../actions/productActions'

function ProductListScreen({ history }) {

    const dispatch = useDispatch()

    const [modalShow, setModalShow] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const productList = useSelector(state => state.productList)
    const { loading, error, products,page,pages } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { success: successDelete,error:errorDelete,loading:loadingDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    let keyword=history.location.search

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listProducts(keyword))
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo,successDelete,keyword])


    const deleteHandler = () => {
            setModalShow(false)
            dispatch(deleteProduct(deleteId))
    }


    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Body className="text-center">
                <i className="fas fa-exclamation-triangle fa-6x text-warning my-3"></i>
                <h3 className="font-weight-bold">This product will be deleted permanently.</h3>
                <h4>
                Do you want to proceed??
                </h4>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button className="btn-danger text-white px-4" onClick={props.onHide} style={{fontSize:'1.2rem'}}>No</Button>
                <Button className="btn-primary text-white px-4"  onClick={deleteHandler} style={{fontSize:'1.2rem'}}>Yes</Button>
            </Modal.Footer>
            </Modal>
        );
    }


    return (
        <Container fluid className="p-0 m-0">
        <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
        />
        <div style={{maxWidth:'1250px',height:'180px',position:'relative'}} className="breadcumb-div d-flex align-items-center mx-auto mb-5">
                <img style={{position:'absolute',top:'50%',right:'8%',height:'90%',transform: 'translate(0, -50%)'}} src="/img/bcimage.png" id="breadcumb-image" alt="breadcumb"></img>
                <Container>
                    <h1 style={{fontWeight:'700'}} className="mb-3">PRODUCTS LIST</h1>
                    <Link to="/home" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>HOME /</Link>
                    <Link to="#" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>ADMIN /</Link>
                    <span style={{fontSize:"1.1em",fontWeight:'600',color:'#046c3c'}}>Products</span>     
                </Container> 
            </div>
        <Container className="px-0">
            <h1 className="px-2 my-3">Products</h1>
            {loadingDelete && <Loader/>}
            {errorDelete&&<Message variant='danger'>{errorDelete}</Message>}
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (<Container className="mt-3 mb-5">
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead className="bg-warning">
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td><strong>${product.new_price}</strong></td>
                                        <td>{product.category.name}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer to={`/products/${product._id}`}>
                                                <Button variant='warning' className='mx-1'>
                                                    <i className='fas fa-eye fa-lg'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' onClick={() => {setDeleteId(product._id);setModalShow(true)}}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Paginate page={page} pages={pages} isAdmin={true}/>
                        </Container>
                    )}
        </Container></Container>
    )
}

export default ProductListScreen