import React, { Component } from 'react'
import Login from '../components/Login/Login'
import Register from '../components/Register/Register'
import Jobs from '../components/Jobs'
import Job from '../components/Job'
import Navbar from '../components/Navbar/Navbar'
import setAuthHeader from '../utils/setAuthHeader'

const initialState = {
  route: 'login',
  isSignedIn: false,
  user: {},
  jobId: ''
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  loadUser = data => {
    this.setState({
      user: data
    })
  }

  handleJob = e => {
    const jobId = e.target.getAttribute('data-job-id')
    this.setState({ jobId }, () => {
      this.onRouteChange('job')
    })
  }

  onRouteChange = route => {
    if (route === 'login') {
      this.setState(initialState)
    } else if (route === 'jobs') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route })
  }

  logoutUser = () => {
    window.localStorage.removeItem('jwtToken')
    setAuthHeader(false)
    this.onRouteChange('login')
  }

  render() {
    const { route, isSignedIn, jobId, user } = this.state
    return (
      <div className="App container-fluid">
        <Navbar
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          logoutUser={this.logoutUser}
        />
        {route === 'jobs' ? (
          <Jobs handleJob={this.handleJob} />
        ) : route === 'job' ? (
          <Job jobId={jobId} user={user} onRouteChange={this.onRouteChange} />
        ) : route === 'login' ? (
          <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    )
  }
}

export default App
