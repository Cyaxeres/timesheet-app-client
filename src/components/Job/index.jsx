import React, { Component } from 'react'
import axios from 'axios'
import TaskDisplay from './TaskDisplay'
import TaskForm from './TaskForm'

class Job extends Component {
  constructor (props) {
    super(props)
    this.state = {
      job: null
    }
  }
  componentDidMount () {
    axios
      .get(`https://dry-eyrie-81261.herokuapp.com/api/jobs/${this.props.jobId}`)
      .then(res => {
        this.setState({
          job: res.data
        })
      })
      .catch(err => console.log(err))
  }

  addTask = task => {
    this.setState(prevState => ({
      job: { ...prevState.job, tasks: [...prevState.job.tasks, task] }
    }))
  }
  render () {
    return (
      <div className='container '>
        <div className='row'>
          <TaskDisplay job={this.state.job} />
          <TaskForm addTask={this.addTask} job={this.state.job} />
          <button className='btn-flat teal-text' onClick={() => this.props.onRouteChange('jobs')}>Back to Jobs</button>
        </div>
      </div>
    )
  }
}

export default Job
