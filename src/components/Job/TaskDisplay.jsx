import React from 'react'
import Time from 'react-time-format'

const TaskDisplay = ({ job }) => {
  const taskList = job && job.tasks.length ? (
    job.tasks.map(task => {
      return (
        <div className='collection-item' key={task._id}>
          <div>
            <strong className='teal-text'>Started at: </strong>
            <Time value={new Date(task.start_time)} date='YYYY-MM-DD HH:MM' />
            <br />
            <strong className='teal-text'>Ended at: </strong>
            <Time value={new Date(task.end_time)} date='YYYY-MM-DD HH:MM' />
          </div>
          <p>Added By: {task.user.name}</p>
          <h5>
            <time>{task.duration}</time>
          </h5>
          <h5 className='teal-text'>Comments</h5>
          <blockquote>{task.comments}</blockquote>
          <br />
        </div>
      )
    })
  ) : (
    <div className='collection-item'><h5>No tasks yet :(</h5></div>
  )

  const jobContent = job ? (
    <div className='card-content'>
      <h4 className='center teal-text'>{job.title}</h4>
      <h6>Client: {job.client.name}</h6>
      <h6>Manager: {job.client.manager.name}</h6>
      <h5 className='center teal-text'>Tasks</h5>
      <div className='collection jobsList'>{taskList}</div>
    </div>
  )
    : (
      <div className='progress'>
        <div className='indeterminate' />
      </div>
    )

  return (
    <div className='col s12 m6 right'>
      <div className='card darken-1'>
        {jobContent}
      </div>
    </div>
  )
}

export default TaskDisplay
