import axios from 'axios'
import getDataFromJSON from '../../getDataFromJSON'
import { GET_MAIN_DATA } from './types'


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