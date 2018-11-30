import React, { Component } from 'react'
import Datetime from 'react-datetime'
import axios from 'axios'
import './react-datetime.css'

class TaskForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: '',
      start_time: '',
      end_time: ''
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleStartDateTime = e => {
    this.setState({
      start_time: e._d
    })
  }

  handleEndDateTime = e => {
    this.setState({
      end_time: e._d
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { comments, start_time, end_time } = this.state
    const taskData = {
      task: {
        comments,
        start_time: start_time.toISOString(),
        end_time: end_time.toISOString()
      }
    }
    this.setState({
      comments: '',
      start_time: '',
      end_time: ''
    })
    axios
      .post(`https://dry-eyrie-81261.herokuapp.com/api/jobs/${this.props.job._id}/tasks`, taskData)
      .then(res => {
        const taskId = res.data.tasks[0]._id
        axios
          .get(`https://dry-eyrie-81261.herokuapp.com/api/jobs/${this.props.job._id}`)
          .then(res => {
            const newTask = res.data.tasks.filter(task => task._id === taskId)
            this.props.addTask(newTask[0])
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }
  render () {
    const { comments, start_time, end_time } = this.state
    return (
      <div className='card center s12 col m6 darken-1 left' id='jobform'>
        <form className='card-content' onSubmit={this.handleSubmit}>
          <h3>Add a Task</h3>
          <div className='card-action'>
            <br />
            <div className='input-field'>
              <textarea
                id='comments'
                name='comments'
                value={comments}
                className='materialize-textarea validate'
                data-length='120'
                onChange={this.handleChange}
                required
              />
              <label htmlFor='comments'>Comment</label>
            </div>
            <div className='datepicker'>
              <Datetime
                name='start_time'
                value={start_time}
                onChange={this.handleStartDateTime}
                required
              />
              <label htmlFor='start_time'>Start Time</label>
            </div>
            <div className='datepicker'>
              <Datetime
                name='end_time'
                value={end_time}
                onChange={this.handleEndDateTime}
                required
              />
              <label htmlFor='end_time'>End Time</label>
            </div>
            <br />
            <button className='wave-effect wave-light btn' type='submit'>
              Add Task
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default TaskForm
