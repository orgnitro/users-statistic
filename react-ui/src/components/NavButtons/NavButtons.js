import React from 'react'
import './NavButtons.scss'
import PrevPages from '../PrevPages/PrevPages'
import NextPages from '../NextPages/NextPages'

const NavButtons = (props) => {
  return (
    <div className="navigation">
      <PrevPages
        visibleButtons={props.visibleButtons}
        handler={props.prevHandler}
        render={props.pageToRender}
      />
      <div className="numeric-buttons">
        {props.visibleButtons.map(id => {
          return (
            
              <button
                key={id}
                onClick={() => props.goToPageHandler(id)}
                className={`navigation-button${props.activeButton === id ? '-active' : ''}`}
              >
                {id}
              </button>
          )
        })}
      </div>
      <NextPages
        pagesID={props.pagesID}
        visibleButtons={props.visibleButtons}
        handler={props.nextHandler}
      />
    </div>
  )
}

export default NavButtons