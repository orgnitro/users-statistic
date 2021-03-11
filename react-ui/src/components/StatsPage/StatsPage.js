import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'
import NavButtons from '../NavButtons/NavButtons';
import StatsTable from '../StatsTable/StatsTable'
import StatsFooter from '../StatsFooter/StatsFooter'
import './StatsPage.scss'
import axios from 'axios';


const StatsPage = ({ data }) => {
  const [visibleData, setVisibleData] = useState(data)
  const [pagesID, setPagesID] = useState([]);
  const [pageToRender, setPageToRender] = useState(null);
  const [visibleButtons, setVisibleButtons] = useState([]);
  const [activeButton, setActiveButton] = useState(1);

  // getTableData aims to loads and calculates additional info about 
  // clicks and page views for the current page
  

  const getTableData = useCallback(async (page_id) => {
    if (visibleData.length === 0) {
      return
    };

    let currentPage = visibleData.slice((page_id - 1) * 50, page_id * 50)
    // let query = await axios.post(`http://localhost:4001/users/viewsAndClicks`, {
    //   'select': ['users_statistic.user_id', 'users_statistic.page_views', 'users_statistic.clicks'],
    //   'ids': currentPage.map(item => item.id)
    // })
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

      setPageToRender(
        currentPage.map((item) => {
          let clicks_views = total.find(elem => elem.user_id === item.id)
          return {
            ...item,
            total_views: clicks_views.page_views,
            total_clicks: clicks_views.clicks
          }
        })
      )
    }
  }, [visibleData])

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
      setVisibleData(result.flat())
    } else {
      setVisibleData(data)
    }
  }, 500)

  useEffect(() => {
    if (visibleData.length === 0) {
      setVisibleData(data)
      return
    }

    // I use pagesID and visibleButtons states for routing

    let pages_ids = [];
    for (let i = 1; i <= Math.ceil(visibleData.length / 50); i++) {
      pages_ids.push(i);
    }
    setPagesID(pages_ids);

    if (pages_ids.length >= 5) {
      setVisibleButtons([1, 2, 3, 4, 5]);
    } else {
      setVisibleButtons(pages_ids);
    }

    getTableData(1);

  }, [data, visibleData, getTableData]);


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
          <input
            type="text"
            placeholder="Enter the name..."
            onChange={(e) => searchByName(e.target.value)}
          />
        </div>

        <StatsTable
          pageToRender={pageToRender}
        />

        <NavButtons
          visibleButtons={visibleButtons}
          activeButton={activeButton}
          pageToRender={pageToRender}
          pagesID={pagesID}
          goToPageHandler={(id) => {
            getTableData(id);
            setActiveButton(id);
          }}

          prevHandler={() => {
            setVisibleButtons(prevValue => {
              let result = []
              for (let i = 1; i < 6; i++) {
                result.unshift(prevValue[0] - i)
              }
              return result
            })
            setPageToRender(getTableData(visibleButtons[0] - 1));
            setActiveButton(visibleButtons[0] - 1);
          }}

          nextHandler={() => {
            setVisibleButtons(prevValue => {
              let result = [];
              prevValue.forEach(item => {
                if (item + 5 <= pagesID[pagesID.length - 1]) {
                  result.push(item + 5)
                }
              })
              return result
            });
            setPageToRender(getTableData(visibleButtons[visibleButtons.length - 1] + 1));
            setActiveButton(visibleButtons[visibleButtons.length - 1] + 1);
          }}
        />
      </div>
      <StatsFooter />
    </div>
  )
}

export default StatsPage