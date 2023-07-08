import React from 'react'
import { Button } from 'react-bootstrap'

const SuggestionCard = ({user}) => {
  return (
    <div className='d-flex align-items-center justify-content-between gap-3 bg-white my-2 p-2'>
        <img className="rounded-pill border-3 border-blue" src={user?.userImage} style={{width: '50px', height: '50px'}}/>
        <div className='pt-3'>
            <h6 className='text-blue'>{user?.username}</h6>
            <p className='text-muted'>Experts in "Design"</p>
        </div>
        <Button className="bg-blue rounded-0 px-4 text-light mt-4 border-0">view</Button>
    </div>
  )
}

export default SuggestionCard