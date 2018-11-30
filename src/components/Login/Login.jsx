import React, { Component } from 'react'
import setAuthHeader from '../../utils/setAuthHeader'
import axios from 'axios'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  handleUsernameChange = e => {
    this.setState({ username: e.target.value })
  }
  handlePasswordChange = e => {
    this.setState({ password: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    e.target.reset()
    const payload = {
      user: {
        username: this.state.username,
        password: this.state.password
      }
    }
    this.setState({
      username: '',
      password: ''
    })
    axios
      .post('https://dry-eyrie-81261.herokuapp.com/api/users/login', payload)
      .then(res => {
        // Extract token from result
        const { user } = res.data
        window.localStorage.setItem('jwtToken', user.token)
        setAuthHeader(user.token)
        const data = {
          id: user._id,
          address: user.address,
          username: user.username,
          name: user.name
        }
        this.props.loadUser(data)
        this.props.onRouteChange('jobs')
      })
      .catch(err => console.log(err))
  }
  render () {
    return (
      <div className='container center s12 z-depth-2' id='login'>
        <div className='card'>
          <form className='card-content' onSubmit={this.handleSubmit}>
            <h3 className='logintext'>Login</h3>
            <div className='input-field col m6'>
              <input
                className='validate'
                type='text'
                name='username'
                id='username'
                required
                onChange={this.handleUsernameChange}
                autoComplete='username'
              />
              <label className='active' htmlFor='username'>
                Username
              </label>
            </div>
            <div className='input-field col m6'>
              <input
                className='validate'
                type='password'
                name='password'
                id='password'
                required
                autoComplete='current-password'
                onChange={this.handlePasswordChange}
              />
              <label htmlFor='password'>Password</label>
            </div>
            <br />
            <button type='submit' className='waves-effect waves-light btn'>
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
