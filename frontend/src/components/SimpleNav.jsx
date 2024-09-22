import React from 'react'
import { useNavigate } from 'react-router-dom'

const SimpleNav = () => {

    const navigate = useNavigate()
  return (
    <div>
            Simple nav
        <button onClick={()=>navigate("/")}>Back to dashboard</button>
    </div>
  )
}

export default SimpleNav