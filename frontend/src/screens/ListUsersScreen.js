import React, { useState,useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { Table, Button, Container,Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'

function UserListScreen({ history }) {

    const dispatch = useDispatch()

    const [modalShow, setModalShow] = useState(false);
    const [deleteId, setDeleteId] = useState(0);

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete,error:errorDelete } = userDelete


    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, successDelete, userInfo])


    const deleteHandler = () => {
            setModalShow(false)
            dispatch(deleteUser(deleteId))
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
                <h3 className="font-weight-bold">User account will be deleted permanently.</h3>
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
                    <h1 style={{fontWeight:'700'}} className="mb-3">USERS LIST</h1>
                    <Link to="/home" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>HOME /</Link>
                    <Link to="#" className="text-muted pr-2" style={{fontSize:"0.9em",fontWeight:'600'}}>ADMIN /</Link>
                    <span style={{fontSize:"1.1em",fontWeight:'600',color:'#046c3c'}}>Users</span>     
                </Container> 
            </div>
        <Container className="px-0">
            <h1 className="px-2 my-3">Users</h1>
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
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                            )}</td>

                                        <td>
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                <Button variant='warning' className='btn-sm mx-1'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' onClick={() => {setDeleteId(user._id);setModalShow(true)}}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table></Container>
                    )}
        </Container></Container>
    )
}

export default UserListScreen