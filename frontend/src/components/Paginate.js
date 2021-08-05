import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    let search='', category=''

    if (keyword) {
        search = new URLSearchParams(keyword).get('keyword')
        category= new URLSearchParams(keyword).get('keyword')
        if (!search) {
            search=''
        }
        if (!category) {
            category=''
        }
    }

    return (pages > 1 && (
        <div className='d-flex justify-content-center'>
        <Pagination >
            {page>1&&(<LinkContainer
                    to={!isAdmin ?
                        `/shop/?keyword=${search}&category=${category}&page=${page-1}`
                        : `/admin/productlist/?page=${page-1}`
                    }
                >
                    <Pagination.Prev/>
            </LinkContainer>)}
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={!isAdmin ?
                        `/shop/?keyword=${search}&category=${category}&page=${x + 1}`
                        : `/admin/productlist/?page=${x + 1}`
                    }
                >
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </LinkContainer>
            ))}
            {page<pages&&(<LinkContainer
                    to={!isAdmin ?
                        `/shop/?keyword=${search}&category=${category}&page=${page+1}`
                        : `/admin/productlist/?page=${page+1}`
                    }
                >
                    <Pagination.Next/>
            </LinkContainer>)}
        </Pagination>
        </div>
    )
    )
}

export default Paginate