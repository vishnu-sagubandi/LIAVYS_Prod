import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/shop/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    
    return (
        <Form onSubmit={submitHandler} inline className="flex-nowrap">
            <Form.Control
                type='search'
                name='q'
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-1'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
            >
                <i className="fas fa-search fa-lg"></i>
            </Button>
        </Form>
    )
}

export default SearchBox