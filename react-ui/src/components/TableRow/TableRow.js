import React from 'react'
import { Link } from 'react-router-dom'
import './TableRow.scss'

const TableRow = ({ pageToRender }) => {
  if (!pageToRender || typeof pageToRender[0] === 'undefined') {
    let blankTable = []
    for (let i = 1; i <= 10; i++) {
      blankTable.push(
        <div key={i} className="table-content">
          <div className="table-item">
            <div className="user-id">...</div>
            <div className="user-fname">Loading...</div>
            <div className="user-lname">Loading...</div>
            <div className="user-email">Loading...</div>
            <div className="user-gender">Loading...</div>
            <div className="user-ip">Loading...</div>
            <div className="user-clicks">Loading...</div>
            <div className="user-views">Loading...</div>
          </div>
        </div>
      )
    }
    return (
      <div>
        {blankTable}
      </div>
    )
  } else {
    return (
      <div>
        {pageToRender.map((user, index) => {
          let color = (index % 2 === 0) ? "#e5e5e5" : "#f1f1f1";
          return (
            <Link key={user.id} to={{ pathname: `/userslist/user${user.id}`, user }}>
              <div className="table-content">
                <div className="table-item">
                  <div style={{ backgroundColor: color }} className="user-id">{user.id}</div>
                  <div style={{ backgroundColor: color }} className="user-fname">{user.first_name}</div>
                  <div style={{ backgroundColor: color }} className="user-lname">{user.last_name}</div>
                  <div style={{ backgroundColor: color }} className="user-email">{user.email}</div>
                  <div style={{ backgroundColor: color }} className="user-gender">{user.gender}</div>
                  <div style={{ backgroundColor: color }} className="user-ip">{user.ip_address}</div>
                  <div style={{ backgroundColor: color }} className="user-clicks">{user.total_views}</div>
                  <div style={{ backgroundColor: color }} className="user-views">{user.total_clicks}</div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}

export default TableRow
