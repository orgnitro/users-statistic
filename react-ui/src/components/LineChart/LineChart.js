import React from 'react'
import { Line } from 'react-chartjs-2'

const LineChart = ({xData, yData }) => {
  return (
    <Line
    data={{
      labels: xData,
      datasets: [{
        borderColor: '#3A80BA',
        data: yData,
        fill: false
      }
      ]
    }}
    // height={"100%"}
    options={{
      // responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      elements: {
        point: {
          radius: 0
        }
      }
    }}
  />

  )
}

export default LineChart
