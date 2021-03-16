import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setVisibleButtons, setPageToRender, setActiveButton } from '../../redux/actions'
import NextImage from '../../assets/images/next.png'

const NextPages = ({getTableData}) => {
  const dispatch = useDispatch()
  const visibleButtons = useSelector(state => state.button.visibleButtons)
  const pagesID = useSelector(state => state.data.pagesID)

  const setNextPage = () => {
    let newVisibleButtons = [];
      visibleButtons.forEach(item => {
        if (item + 5 <= pagesID[pagesID.length - 1]) {
          newVisibleButtons.push(item + 5)
        }
      })
      
    dispatch(setVisibleButtons(newVisibleButtons));
    dispatch(setPageToRender(getTableData(newVisibleButtons[0])));
    dispatch(setActiveButton(newVisibleButtons[0]));
  }


  if (visibleButtons[visibleButtons.length - 1] >= pagesID[pagesID.length - 1]) {
    return (
      <div></div>
    )
  } else {
    return (
      <div className="nextPages" onClick={setNextPage}>
        <img src={NextImage} alt="" />
      </div>
    )
  }
}

export default NextPages