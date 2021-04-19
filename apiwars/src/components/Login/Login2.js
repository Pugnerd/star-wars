import React, { useState } from 'react';
//import PropTypes from 'prop-types';
//import './Login.css';
function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
}

async function loginUser(credentials,setData,setMessage) {
 return await fetch('http://localhost:8080/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
 .then(handleErrors)
 .then( async function(response) {
  console.log("ok");
  const data = await response.json();
  console.log('returned jsondata=',data);
  setData(data);
  if (data.message.indexOf('ok')>-1){
     window.location='/'
  }else{}
  return data
  })
  .catch(function(error) {
   const data ={message:<h5 className="red">email or password incorrect.<br/> Please try again</h5>}
       setData(data);
       setMessage(data);
       console.log('err:',error,data);
       return data
   });/* 
 .then(data => {
   let adat =data.json() 
  console.log('data=',adat);
 return adat
 }) */
}

export default function Login2(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [data, setData] = useState();
  const [message, setMessage] = useState({message:'',id:null});

  console.log('props=',props,data,message);
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    },setData,setMessage);
    
    if (typeof(props.setToken) !== 'undefined'){
    //  console.log('login setToken=',props.setToken);
      props.setToken(token);
    }else{
      console.log('no SetToken');
    }
   
  }
/* if (typeof(email) !== 'undefined')
  return (email) */
  return(
   
    <div className="login-wrapper">
      <div className='login'>
      <a className='frmClose close' onClick={()=> window.location="/" } href='/'><span aria-hidden="true">×</span></a>
 <br></br>
      <h3>Please Log In</h3>
      <p>{message.message}</p>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button className="btn btn-success" type="submit">Login</button> &nbsp; &nbsp; &nbsp; <a className="btn btn-primary" href="/register">Register</a>
        </div>
      </form>
      </div>
    </div>
  )
}

/* Login.ppropTypes = {
  setToken: pPropTypes.func.isRrequired
}; */