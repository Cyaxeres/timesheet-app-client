import React, { Component } from 'react'
import axios from 'axios'

class Timesheet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      client: ''
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { client, title } = this.state
    const jobData = {
      job: { title, client }
    }
    this.setState({
      title: '',
      client: ''
    })
    axios
      .post('https://dry-eyrie-81261.herokuapp.com/api/jobs', jobData)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  render () {
    const { client, title } = this.state
    const { clients } = this.props
    let clientOptions = clients.map(client => {
      return (
        <option value={client._id} key={client._id}>
          {client.name}
        </option>
      )
    })
    return (
      <div className='container center s12 z-depth-2 left' id='timesheet'>
        <div className='card'>
          <form className='card-content' onSubmit={this.handleSubmit}>
            <h3>Add a Job</h3>
            <br />
            <div className='input-field col m6'>
              <input
                className='validate'
                type='text'
                name='title'
                id='job-title'
                value={title}
                onChange={this.handleChange}
                required
              />
              <label htmlFor='job-title'>Job Title</label>
            </div>
            <br />
            <div className='input-field col m6'>
              <select
                className='browser-default'
                name='client'
                id='client-name'
                value={client}
                onChange={this.handleChange}
                required
              >
                <option value='0'>Choose a client</option>
                {clientOptions}
              </select>
            </div>
            <br />
            <button className='wave-effect wave-light btn' type='submit'>
              Add Job
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Timesheet
