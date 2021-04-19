import React, { useState } from 'react';
//import PropTypes from 'prop-types';
//import './Login.css';

async function loginUser(credentials) {
  console.log('credentials=',credentials);
 return fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => {
     console.log('data=',data);
    return data.json() 
    }
   
   )
}

export default function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    if (typeof(props.token) !== 'undefined'){
      console.log('login setToken=',token);
      props.setToken(token);
    }else{
      console.log('no SetToken');
    }
  }

  return(
    <div className="login-wrapper">
    
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Login</button> <a href="/register">Register</a> 
        </div>
      </form>
    </div>
  )
}

/* Login.ppropTypes = {
  setToken: pPropTypes.func.isRrequired
}; */