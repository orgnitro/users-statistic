import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setActiveButton } from '../../redux/actions'
import './NavButtons.scss'
import PrevPages from '../PrevPages/PrevPages'
import NextPages from '../NextPages/NextPages'


const NavButtons = ({ getTableData }) => {
  const dispatch = useDispatch()
  const visibleButtons = useSelector(state => state.button.visibleButtons)
  const activeButton = useSelector(state => state.button.activeButton)

  const goToPage = page_id => {
    getTableData(page_id);
    dispatch(setActiveButton(page_id));
  }
  return (
    <div className="navigation">

      <PrevPages getTableData={getTableData} />

      <div className="numeric-buttons">
        {visibleButtons.map(id => (
          <button
            key={id}
            onClick={() => goToPage(id)}
            className={`navigation-button${activeButton === id ? '-active' : ''}`}
          >
            {id}
          </button>
        ))}
      </div>

      <NextPages getTableData={getTableData} />
    </div>
  )
}

export default NavButtons