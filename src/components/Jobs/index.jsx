import React, { Component } from 'react'
import axios from 'axios'
import JobDisplay from './JobDisplay'
import JobForm from './JobForm'

class Jobs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      jobs: [],
      clients: []
    }
  }

  getJobs = () => {
    axios
      .get('https://dry-eyrie-81261.herokuapp.com/api/jobs')
      .then(res => {
        this.setState({
          jobs: res.data
        })
      })
      .catch(err => console.log(err.message))
  }

  getClients = () => {
    axios.get('https://dry-eyrie-81261.herokuapp.com/api/clients').then(res => {
      this.setState({
        clients: res.data
      })
    })
      .catch(err => console.log(err.message))
  }

  componentDidMount () {
    this.getJobs()
    this.getClients()
  }

  addJob = job => {
    this.setState(prevSate => ({
      jobs: [...prevSate.jobs, job]
    }))
  }
  render () {
    return (
      <div className='container '>
        <div className='row'>
          <JobDisplay
            jobs={this.state.jobs}
            clients={this.state.clients}
            handleJob={this.props.handleJob}
          />
          <JobForm clients={this.state.clients} addJob={this.addJob} />
        </div>
      </div>
    )
  }
}

export default Jobs
