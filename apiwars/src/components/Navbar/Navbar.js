import React from 'react'

function Navbar(props) {

    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);


    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Planet list <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" onClick={(e)=> props.showVotes(e)}>Voting statistics</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">Registration</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout" >Logout {props.token}</a>
            </li>
            <li className="nav-item">
            { !userToken ? null :  <><a className="nav-link" href="/dashboard">Dashboard</a>  </>}
            </li>
          </ul>
          <span className="navbar-text">
        
            {userToken && userToken.email}
            <a className="nav-link" href="/Intro">Intro </a>
          </span>
        </div>
      </nav>
    )
}

export default Navbar
