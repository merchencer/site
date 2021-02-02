import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'

import Landing from './landing/Landing'
import Register from './register/Register'
import Login from './login/Login'
import Profile from './profile/Profile'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </Router>
  )
}

export default App
