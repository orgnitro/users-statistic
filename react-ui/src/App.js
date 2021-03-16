import React, { useEffect } from 'react';
import MainPage from './components/MainPage/MainPage';
import Logo from './components/Logo/Logo';
import StatsPage from './components/StatsPage/StatsPage';
import UserDetailsPage from './components/UserDetailsPage/UserDetailsPage'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMainData } from './redux/actions/actions' 


const App = () => {
  const data = useSelector(state => state.dataReducer.mainUserData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!data || !data.length) {
      dispatch(getMainData())
    }
  }, [data, dispatch]);

  return (
    <React.Fragment>
      <Router>
        <Logo />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/userslist" exact component={StatsPage} />
          <Route path="/userslist/user:userid" component={UserDetailsPage} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App