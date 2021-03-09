import React from 'react'
import './PrevPages.scss'
import PrevImage from '../../assets/images/prev.png'

const PrevPages = ({visibleButtons, handler}) => {
  if (visibleButtons[0] === 1) {
    return (
      <div></div>
    )
  } else {
    return (
      <div className="prevPages" onClick={handler}>
        <img src={PrevImage} alt=""/>
      </div>
    )
  }
  
}

export default PrevPages
