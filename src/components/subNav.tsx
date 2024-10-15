import React from 'react'
import { Link } from 'react-router-dom'

function subNav() {
    return (
        <div className='w-full'>
            <div>
                <Link to={`/collections`}><h1>Collections</h1></Link>
            </div>
        </div>
    )
}

export default subNav