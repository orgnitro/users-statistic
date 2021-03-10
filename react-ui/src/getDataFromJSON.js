import axios from 'axios'

const getDataFromJSON = async (json, route) => {
  let dataStream = await fetch(json, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  // Takes json file

  let dataJSON = await dataStream.json();

  // Sorts data from users_statistic.json file by IDs 

  if (json === './data/users_statistic.json') {
    let sortedArray = await dataJSON.sort((a, b) => {
      return a.user_id - b.user_id
    });
    dataJSON = sortedArray
  }

  // We could not write too much data to database at a time, 
  // and have to split data to small chunks

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