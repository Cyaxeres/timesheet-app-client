import React from 'react'

const JobDisplay = ({ jobs, handleJob }) => {
  const jobsList = jobs.length ? (
    jobs.map(job => {
      return (
        <div className='collection-item' key={job._id}>
          <h5 className='teal-text'>{job.title}
            {job.taskCount > 0 && <span className='new badge' data-badge-caption='tasks'>{job.taskCount}</span>}
          </h5>
          <p>Client: {job.client.name}</p>
          <div className='secondary-content'>
            <span>
              <u
                className='clickable teal-text'
                onClick={handleJob}
                data-job-id={job._id}>
                Manage Tasks
              </u>
            </span>{' '}
          </div>
          <br />
        </div>
      )
    })
  ) : (
    <div className='progress'>
      <div className='indeterminate' />
    </div>
  )

  return (
    <div className='col s12 m6 right'>
      <div className='card darken-1'>
        <div className='card-content'>
          <h3 className='center'>Jobs</h3>
          <div className='collection jobsList'>{jobsList}</div>
        </div>
      </div>
    </div>
  )
}

export default JobDisplay
