import React from 'react'

const Navbar = props => {
  if (props.isSignedIn) {
    return (
      <nav className='nav-wrapper teal darken-3'>
        <div className='container-fluid'>
          <p className='brand-logo clickable' onClick={() => props.onRouteChange('login')}>Vertis Timesheet</p>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li><p className='clickable navItem' onClick={props.logoutUser}>Sign out</p></li>
          </ul>
        </div>
      </nav>
    )
  } else {
    return (
      <nav className='nav-wrapper teal darken-3'>
        <div className='container-fluid'>
          <p className='brand-logo clickable' onClick={() => props.onRouteChange('login')}>Vertis Timesheet</p>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li><p className='clickable navItem' onClick={() => props.onRouteChange('login')}>Sign in</p></li>
            <li><p className='clickable navItem' onClick={() => props.onRouteChange('register')}>Register</p></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
