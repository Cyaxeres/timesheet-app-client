import React, { Component } from 'react'
import axios from 'axios'

export default class Register extends Component {
  state = {
    name: '',
    address: '',
    username: '',
    password: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    e.target.reset()
    const payload = {
      user: {
        name: this.state.name,
        address: this.state.address,
        username: this.state.username,
        password: this.state.password
      }
    }
    axios
      .post('https://dry-eyrie-81261.herokuapp.com/api/users/', payload)
      .then(res => {
        // Redirect
        this.props.onRouteChange('login')
      })
      .catch(err => console.log(err))
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    return (
      <div className='container center s12 z-depth-2' id='register'>
        <div className='card'>
          <form className='card-content' onSubmit={this.handleSubmit}>
            <h3 className='signuptext'>Register</h3>
            <div className='input-field'>
              <input
                className='validate'
                type='text'
                name='name'
                id='name'
                required
                onChange={this.handleChange}
                autoComplete='name'
              />
              <label className='active' htmlFor='name'>
                Name
              </label>
            </div>
            <div className='input-field'>
              <input
                className='validate'
                type='text'
                name='address'
                id='address'
                required
                onChange={this.handleChange}
                autoComplete='address'
              />
              <label className='active' htmlFor='address'>
                Address
              </label>
            </div>
            <div className='input-field'>
              <input
                className='validate'
                type='text'
                name='username'
                id='username'
                required
                onChange={this.handleChange}
                autoComplete='username'
              />
              <label className='active' htmlFor='username'>
                Username
              </label>
            </div>
            <div className='input-field'>
              <input
                className='validate'
                type='password'
                name='password'
                id='password'
                required
                autoComplete='current-password'
                onChange={this.handleChange}
              />
              <label htmlFor='password'>Password</label>
            </div>
            <br />
            <button type='submit' className='waves-effect waves-light btn'>
              Register
            </button>
          </form>
        </div>
      </div>
    )
  }
}
