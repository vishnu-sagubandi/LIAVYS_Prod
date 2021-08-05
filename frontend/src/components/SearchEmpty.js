import React from 'react'

function SearchEmpty({msg}) {
    return (
        <div className='d-flex align-items-center flex-column'>
            <img src="/static/img/searchEmpty.svg" style={{width:'80%',maxWidth:'200px'}} alt="Search Empty"></img>
            <h2 className="text-muted mt-4 mb-2">{msg}</h2>
        </div>
    )
}

export default SearchEmpty
