import React,{useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from   './components/Dashboard/Dashboard.js';
import Login from       './components/Login/Login2.js';
import Navbar from      './components/Navbar/Navbar.js';
import ModalDialog from './components/Modal/Modal.js';
import Register from    './components/Register/Register.js';
import Preferences from './components/Preferences/Preferences.js';
import Intro from       './components/Intro/intro.js';

import PlanetList from  './components/Planetlist/PlanetList.js';
import useToken from    './useToken';

//import 'bootstrap-dist-css-bootdtrap.min.css'
import {Container, Row} from 'react-bootstrap';


// credits to : https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// credits to : https://www.youtube.com/watch?v=-RCnNyD0L-s&ab_channel=WebDevSimplified
function App() {
 


  const {token,     setToken     } = useToken();
  const [show,      setShow      ] = useState(false)
  const [modalData, setModalData ] = useState('')


  const showVotes= (e) =>{
    e.preventDefault()
    console.log('showVotes');
    let planetvotes = [] // fetch from url....
    setModalData({type:'VoteStats',  title:'Planet votes ', data: planetvotes})
    setShow(true)
  }

   const Logout = () => {removeToken(); setTimeout( ()=>window.location="/",400) ;return ( <h3>You have been logged out.</h3> ) }
  // logout
  const removeToken = userToken => {
    sessionStorage.removeItem('token');
    setToken(null);
    };

let intro = window.location.toString().indexOf('Intro')>-1;
console.log('intro=',intro,window.location.toString());
  if(!token) {
    /* teljes login-is védelem esetén */
    // return <Login setToken={setToken} />
  }

  return ( 
    <div className="app-wrapper">
    
      <h3 className="white">API Wars </h3> 
   {/*  <button type="button" onClick={()=>showVotes()} class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Small modal</button>
       {window.location.pathname !== '/login' ? <a href="/login">Login</a> : null} */}


     {!intro && <Navbar email={token} removeToken={removeToken} showVotes={showVotes}/>  }

    


    <BrowserRouter>
        <Switch>
           <Route  path={ "/dashboard"   } component={() => <Dashboard token={token} />  } />
           <Route  path={ "/votingstats" } component={() => <Preferences />              } />
           <Route  path={ "/login"       } component={() => <Login setToken={setToken} />} />
           <Route  path={ "/register"    } component={() => <Register />                 } />
           <Route  path={ "/logout"      } component={() => <Logout />                   } />
           <Route  path={ "/intro"       } component={() => <Intro />                   } />
        </Switch>
    </BrowserRouter>
     
      <Container>
          <Row> 
            <div className="modalwrapper" style={{display:show ?'flex':'none'}}>
              <ModalDialog show={show.toString()} setShow={setShow} modalData={modalData} />
            </div>
          </Row>
          <Row>
          { (!intro && window.location.toString().indexOf('dashboard')===-1 )&&    <PlanetList show={show} setShow={setShow} setModalData={setModalData} token={token} />}
          </Row>
        </Container> 
    </div>

  );
}

export default App;