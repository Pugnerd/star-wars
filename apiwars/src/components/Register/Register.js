import React, { useState } from 'react';
import PropTypes from 'prop-types';
//import './Login.css';

async function registerUser(credentials) {
 return fetch('http://localhost:8080/register', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Register({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [message, setMessage] = useState({message:'',id:null});

  const handleSubmit = async e => {
    e.preventDefault();
    const regData = await registerUser({
      name,
      email,
      password
    });
    console.log(regData);
    setMessage(regData);
  }
 if(message.message.indexOf('success')>-1)
   return(
    <div className="login-wrapper">
    <div className='login'>
     {/* // eslint-disable-next-line jsx-a11y/anchor-has-content */}
     <a className='frmClose close' onClick={()=> window.location="/" } href='/'><span aria-hidden="true">×</span></a>
     <p>The registration was successful.</p>
     <h4>Please login</h4><br/>
     <a className="btn btn-primary" href="/login">Login</a>
     </div>
     </div>
     )
  return(
    <div className="login-wrapper">
       <div className='login'>
      <a className='frmClose close' onClick={()=> window.location="/" } href='/'><span aria-hidden="true">×</span></a>
 
      <h3>Registration form</h3>
      <h5 className="red">{message.message}</h5>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input type="text" name="name" onChange={e => setName(e.target.value)} required />
        </label>
  
        <label>
          <p>Email</p>
          <input type="email" onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}  required />
        </label>
        <div>
          <button className="btn btn-primary" type="submit">Register</button> &nbsp; <a  className="btn btn-info"  variant="" href="/login">Login</a>
        </div>
      </form>
      </div>
    </div>
  )
}
/* 
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}; */