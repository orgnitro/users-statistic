import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import { addTotalInfo, setVisibleButtons, setPagesID } from '../../redux/actions'
import NavButtons from '../NavButtons/NavButtons';
import StatsTable from '../StatsTable/StatsTable'
import StatsFooter from '../StatsFooter/StatsFooter'
import './StatsPage.scss'


const StatsPage = () => {
  const data = useSelector(state => state.data.mainUserData)
  const [filteredData, setFilteredData] = useState(data)
  const dispatch = useDispatch()

  // getTableData aims to loads and calculates additional info about 
  // clicks and page views for the current page

  const getTableData = useCallback(async (page_id) => {
    if (filteredData.length) {
      let currentPage = filteredData.slice((page_id - 1) * 50, page_id * 50)
      let select = 'users_statistic.user_id&users_statistic.page_views&users_statistic.clicks';
      let ids = currentPage.map(item => item.id).join('&')
      let query = await axios.get(`/users/viewsAndClicks/${select}/${ids}`)

      // Here total clicks and views are calculated

      if (query || query.data.length !== 0) {
        let total = await query.data.reduce((acc, curr) => {
          if (curr.user_id === acc[acc.length - 1].user_id) {
            acc[acc.length - 1].page_views += curr.page_views;
            acc[acc.length - 1].clicks += curr.clicks;
          } else {
            acc.push({
              user_id: curr.user_id,
              page_views: curr.page_views,
              clicks: curr.clicks
            })
          }
          return acc
        }, [{
          user_id: query.data[0].user_id,
          page_views: query.data[0].page_views,
          clicks: query.data[0].clicks
        }]);

        dispatch(addTotalInfo(currentPage, total))
      }
    }
  }, [filteredData, dispatch])


  const searchByName = debounce((text) => {
    if (text.trim()) {
      let query = text.toLowerCase().split(' ')
      let result = []

      query.forEach(word => {
        let match = data.filter(item => {
          return item.first_name.toLowerCase().includes(word) || item.last_name.toLowerCase().includes(word)
        })
        result.push(match)
      })

      if (result.flat().length === 0) {
        const userNotFoundAttention = document.querySelector('p.user-not-found')
        userNotFoundAttention.style.opacity = 1
        setTimeout(() => userNotFoundAttention.style.opacity = 0, 1000)
      }
      setFilteredData(result.flat())
    } else {
      setFilteredData(data)
    }
  }, 1000)


  useEffect(() => {
    if (filteredData.length === 0) {
      setFilteredData(data)
      return
    } else {

      // I use pagesID and visibleButtons states for routing

      let pages_ids = [];
      for (let i = 1; i <= Math.ceil(filteredData.length / 50); i++) {
        pages_ids.push(i);
      }
      dispatch(setPagesID(pages_ids));

      if (pages_ids.length >= 5) {
        dispatch(setVisibleButtons([1, 2, 3, 4, 5]));
      } else {
        dispatch(setVisibleButtons(pages_ids));
      }
    }
  }, [data, filteredData, dispatch]);

  
  useEffect(() => {
    getTableData(1)
  }, [data, getTableData])


  return (
    <div>

      <div className="users-list wrapper">
        <div className="links">
          <Link to="/">Main page</Link>
          <p>&gt;</p>
          <p>User statistics</p>
        </div>

        <div className="header-and-search">
          <h2>Users statistics</h2>
          <div className="search-by-name">
            <p className="user-not-found">User not found</p>
            <input
              type="text"
              placeholder="Enter the name..."
              onChange={(e) => searchByName(e.target.value)}
            />
          </div>
        </div>

        <StatsTable />

        <NavButtons getTableData={getTableData} />

      </div>

      <StatsFooter />

    </div>
  )
}

export default StatsPage