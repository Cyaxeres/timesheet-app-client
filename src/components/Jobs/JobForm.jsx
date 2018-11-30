import React, { Component } from 'react'
import axios from 'axios'

class JobForm extends Component {
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
        this.props.addJob(res.data)
      })
      .catch(err => console.log(err.message))
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
      <div className='card center s12 col m6 darken-1 left' id='jobform'>
        <form className='card-content' onSubmit={this.handleSubmit}>
          <h3>Add a Job</h3>
          <div className='card-action'>
            <br />
            <div className='input-field'>
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
            <div className='input-field'>
              <select
                className='browser-default'
                name='client'
                id='client-name'
                value={client}
                onChange={this.handleChange}
                required>
                <option value='0'>Choose a client</option>
                {clientOptions}
              </select>
            </div>
            <br />
            <button className='wave-effect wave-light btn' type='submit'>
              Add Job
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default JobForm
