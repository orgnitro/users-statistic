import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './UserDetailsPage.scss'
import LineChart from '../LineChart/LineChart'
import StatsFooter from '../StatsFooter/StatsFooter'


const UserDetailsPage = (props) => {
  const userid = props.match.params.userid
  const [userData, setUserData] = useState(null)
  const [filter, setFilter] = useState([])
  const [plotData, setPlotData] = useState(null)

  async function getUserDetails(id) {

    // Loads detailed info about user, and set default values for date filter

    const name = await axios.get(`/users/conditionSearch/users/first_name&last_name/id/${id}`);
    const activities = await axios.get(`/users/viewsAndClicks/
    users_statistic.date&users_statistic.page_views&users_statistic.clicks/${id}`);
    
    const user = {
      first_name: name.data[0].first_name,
      last_name: name.data[0].last_name,
      activities: activities.data
    }

    setUserData(user)

    let filterDefault_to = new Date(user.activities[user.activities.length - 1].date)
    let filterDefault_from = new Date(filterDefault_to - 8.64e7 * 7);

    setFilter([filterDefault_from, filterDefault_to])
  }

  async function settingPlotData(userData, dateFilter) {
    if (!userData) {
      return
    } else {
      let from, to
      let xValues = []
      let yValues = []
      let plotData = userData.activities;

      if ((dateFilter.length === 0)) {
        to = new Date(plotData[plotData.length - 1].date)
        from = new Date(to - 8.64e7 * 7);
      } else {
        from = new Date(dateFilter[0])
        to = new Date(dateFilter[1])
      }

      do {
        xValues.push(from.toISOString().replace(/T(.+)/, ''))
        from.setDate(new Date(from).getDate() + 1)
      } while (+from <= +to);

      yValues = xValues.map(date => {
        let index = plotData.findIndex(item => item.date === date)
        return (index !== -1) ? plotData[index] : 0
      });

      xValues = xValues.map(item => {
        let date = new Date(item)
        return date.toLocaleString('en-US', { day: '2-digit', month: 'short' })
      })
      setPlotData([xValues, yValues])
    }
  }


  useEffect(() => {
    getUserDetails(userid)
  }, [userid])

  useEffect(() => {
    settingPlotData(userData, filter)
  }, [userData, filter])

  return (
    <Fragment>
      <div className="user-details wrapper">
        <div className="links">
          <Link to="/">Main page</Link>
          <p>&gt;</p>
          <Link to="/userslist">User statistics</Link>
          <p>&gt;</p>
          <p>{userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}</p>
        </div>

        <div className="user-statistics">
          <h2>
            {userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}
          </h2>

          <div className="filter-inputs">
            <div className="filter-input">
              <p>From</p>
              <input
                type='date'
                min={userData ? userData.activities[0].date : '1969-08-01'}
                max={filter.length !== 0 ? filter[1].toISOString().replace(/T(.+)/, '') : '1999-08-01'}
                value={filter.length !== 0 ? filter[0].toISOString().replace(/T(.+)/, '') : '1969-08-01'}
                onChange={e => setFilter(prevFilter => [new Date(e.target.value), prevFilter[1]])}
              />
            </div>

            <div className="filter-input">
              <p>To</p>
              <input
                type='date'
                min={filter.length !== 0 ? filter[0].toISOString().replace(/T(.+)/, '') : '1969-08-01'}
                max={userData ? userData.activities[userData.activities.length - 1].date : '1999-08-01'}
                value={filter.length !== 0 ? filter[1].toISOString().replace(/T(.+)/, '') : '1969-08-01'}
                onChange={e => setFilter(prevFilter => [prevFilter[0], new Date(e.target.value)])}
              />
            </div>
          </div>

          <div className="chart-container clicks-chart">
            <h3>Clicks</h3>
            <LineChart
              xData={plotData ? plotData[0] : 0}
              yData={plotData ? plotData[1].map(item => item.clicks) : 0}
            />
          </div>

          <div className="chart-container views-chart">
            <h3>Views</h3>
            <LineChart
              xData={plotData ? plotData[0] : 0}
              yData={plotData ? plotData[1].map(item => item.page_views) : 0}
            />
          </div>
        </div>
      </div>
      <StatsFooter />
    </Fragment>
  )
}

export default UserDetailsPage
