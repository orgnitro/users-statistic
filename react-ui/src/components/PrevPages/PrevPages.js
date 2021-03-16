import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setVisibleButtons, setPageToRender, setActiveButton } from '../../redux/actions'
import PrevImage from '../../assets/images/prev.png'


const PrevPages = ({ getTableData }) => {
  const visibleButtons = useSelector(state => state.button.visibleButtons)
  const dispatch = useDispatch()

  const setPrevPage = () => {
    let newVisibleButtons = []

    for (let i = 1; i < 6; i++) {
      newVisibleButtons.unshift(visibleButtons[0] - i)
    }

    dispatch(setVisibleButtons(newVisibleButtons))
    dispatch(setPageToRender(getTableData(visibleButtons[0] - 1)));
    dispatch(setActiveButton(visibleButtons[0] - 1))
  }

  if (visibleButtons[0] === 1) {
    return (
      <div></div>
    )
  } else {
    return (
      <div className="prevPages" onClick={setPrevPage}>
        <img src={PrevImage} alt="" />
      </div>
    )
  }
}

export default PrevPages