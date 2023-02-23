import React from 'react'
import { Link } from 'react-router-dom'

const Main = () => {
  return (
    <div>
        <Link to='/signup'>
            <button>SignUp</button>
        </Link>
        
        <Link to='/login'>
            <button>Login</button>
        </Link>
        
        <Link to='/upload'>
          <button>Upload</button>
        </Link>
    </div>

  )
}

export default Main