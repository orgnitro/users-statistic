import axios from 'axios'
import getDataFromJSON from '../../getDataFromJSON'
import { GET_MAIN_DATA, ADD_TOTAL_INFO, SET_VISIBLE_BUTTONS, SET_PAGE_TO_RENDER, SET_ACTIVE_BUTTON, SET_PAGES_ID } from './types'


export const getMainData = () => async (dispatch) => {
  let getAllUsers = await axios.get('/users/getFromTable/users/*');
  if (getAllUsers.data.length === 0) {
    await getDataFromJSON('./data/users.json', 'addUsers');
    getAllUsers = await axios.get('/users/getFromTable/users/*');
  }

  dispatch({
    type: GET_MAIN_DATA,
    payload: getAllUsers.data
  })

  let getAllStats = await axios.get('/users/getFromTable/users_statistic/*');
  if (getAllStats.data.length === 0) {
    await getDataFromJSON('./data/users_statistic.json', 'addUsersStatistic');
  }
}

export const addTotalInfo = (currentPageMainData, totalClicksAndViews) => async (dispatch) => {
  let pageToRender = await currentPageMainData.map((item) => {
    let clicks_views = totalClicksAndViews.find(elem => elem.user_id === item.id)
    if (!clicks_views) {
      return []
    }
    return {
      ...item,
      total_views: clicks_views.page_views,
      total_clicks: clicks_views.clicks
    }
  })
  dispatch({
    type: ADD_TOTAL_INFO,
    payload: pageToRender
  })
}

export const setPageToRender = (page) => (dispatch) => {
  dispatch({
    type: SET_PAGE_TO_RENDER,
    payload: page
  })
}

export const setVisibleButtons = (buttons) => (dispatch) => {
  dispatch({
    type: SET_VISIBLE_BUTTONS,
    payload: buttons
  })
}

export const setActiveButton = (activeButton) => dispatch => {
  dispatch({
    type: SET_ACTIVE_BUTTON,
    payload: activeButton
  })
}

export const setPagesID = pagesID => dispatch => {
  dispatch({
    type: SET_PAGES_ID,
    payload: pagesID
  })
}