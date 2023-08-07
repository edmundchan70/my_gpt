import React from 'react'
import "./index.css"
type Props = {}

function LoadingAnimation({}: Props) {
  return (
    <div className="typing">
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
  </div>
  )
}

export default LoadingAnimation