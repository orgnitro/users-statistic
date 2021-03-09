import axios from 'axios'

const getDataFromJSON = async (json, route) => {
  let dataStream = await fetch(json, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  let dataJSON = await dataStream.json();

  if (json === './data/users_statistic.json') {
    let sortedArray = await dataJSON.sort((a, b) => {
      return a.user_id - b.user_id
    });
    dataJSON = sortedArray
  }

  for (let i = 1; i < dataJSON.length; i++) {
    if (i % 500 === 0) {
      await axios.post(`/users/${route}`, {
        'data': dataJSON.slice(i - 500, i)
      })
    }
    if ((dataJSON.length - i) < 500) {
      await axios.post(`/users/${route}`, {
        'data': dataJSON.slice(i - 1)
      })
      break
    }
  }
}

export default getDataFromJSON