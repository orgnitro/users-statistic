import React, { useState, useEffect, useCallback } from 'react';
import MainPage from './components/MainPage/MainPage';
import Logo from './components/Logo/Logo';
import StatsPage from './components/StatsPage/StatsPage';
import UserDetailsPage from './components/UserDetailsPage/UserDetailsPage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import getDataFromJSON from './getDataFromJSON'
import axios from 'axios'


const App = () => {
  const [data, setData] = useState([])

  const getData = useCallback(async () => {
    if (data.length) {return};
    let getAllUsers = await axios.get('/users/getFromTable/users/*');
    if (getAllUsers.data.length === 0) {
      let usersFromJSON = await getDataFromJSON('./data/users.json', 'addUsers');
      let getAllUsers = await axios.get('/users/getFromTable/users/*');
      setData(getAllUsers.data);
    } else {
      setData(getAllUsers.data);
    }
    let getAllStats = await axios.get('/users/getFromTable/users_statistic/*');
    if (getAllStats.data.length === 0) {
      let usersFromJSON = await getDataFromJSON('./data/users_statistic.json', 'addUsersStatistic');
    }
  }, [data])

  useEffect(() => {
    getData()
  }, [data, getData]);

  return (
    <React.Fragment>
      <Router>
        <Logo />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/userslist" exact
            render={() => (<StatsPage data={data} />)}
          />
          <Route path="/userslist/user:userid" component={UserDetailsPage} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App