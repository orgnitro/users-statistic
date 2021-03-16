import React from 'react'
import './StatsTable.scss'
import TableRow from '../TableRow/TableRow'

const StatsTable = () => {
    return (
      <div className="stats-table">
        <div className="table-header">
          <div className="none">id</div>
          <div className="none">First name</div>
          <div className="none">Last name</div>
          <div className="none">Email</div>
          <div className="none">Gender</div>
          <div className="none">IP address</div>
          <div className="none">Total clicks</div>
          <div className="none">Total page views</div>
        </div>

        <div className="table-content">
          <TableRow />
        </div>
      </div>
    )
  // }

}

export default StatsTable
