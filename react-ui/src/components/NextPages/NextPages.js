import React from 'react'
import NextImage from '../../assets/images/next.png'

const NextPages = ({pagesID, visibleButtons, handler}) => {
  if (visibleButtons[visibleButtons.length - 1] >= pagesID[pagesID.length - 1]) {
    return (
      <div></div>
    )
  } else {
    return (
      <div className="nextPages" onClick={handler}>
        <img src={NextImage} alt=""/>
      </div>
    )
  }
  
}

export default NextPages
