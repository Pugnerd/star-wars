import React from 'react'
//import starwarsAudio from "https://ia903204.us.archive.org/16/items/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.ogg"
import starwarsAudio from "./StarWars.ogg"
 import './style.css'
function intro() {

    
    function playAudio() { 
        
   setTimeout( ()=> window.location='/',1000*85)
    
        let audio = document.getElementById("myAudio"); 
        document.getElementById("myAudio").volume=0.010
        document.getElementById("volume-control").value=1.1
        audio.play(); 
    } 
    
    function pauseAudio() { 
        let audio = document.getElementById("myAudio"); 
        audio.pause(); 
    } 

    function startIntro(){
        document.querySelector('.scroll-text').classList.add("start-animation");
        document.querySelector('.starwar-audio').style.opacity = 1;
        document.querySelector('.start-intro').style.opacity = 0;
        document.querySelector('.start-skip-intro').style.top = '5px';
        document.querySelector('.start-skip-intro').style.left = '80%';
        document.querySelector('.start-skip-intro').style.right = '5px';
        document.querySelector('.start-skip-intro').style.display = 'inline-block';
        document.querySelector('body').style.maxWidth = '1024px';
        document.querySelector('body').style.minWidth = '1023px';
     

  setTimeout( ()=>document.querySelector('.wrapper-star-wars-logo').style.display = 'block',300)
  setTimeout( ()=>  document.querySelector('.wrapper-star-wars-logo').classList.add('hide-star-wars-logo'),400)
        playAudio()
        
    }
    

    let volume = document.getElementById("volume-control");

    if (typeof(volume) === 'object' ){
            console.log('volumecontrol',volume);
    
    }

   // document.querySelector('html').style.backgroundImage ="url('https://wallpapertag.com/wallpaper/full/a/5/b/547899-large-star-sky-wallpaper-3100x1740-4k.jpg')"
    
    document.querySelector('body').style.backgroundColor =  "rgba(240, 255, 240,0)";
    document.querySelector('body').style.overflow =  "hidden";
    return ( <div className='wbody'>
 
                <div className="starwar-audio" >
                    <audio id="myAudio"  src={starwarsAudio}  type="audio/ogg"/>
                    
                    <button className="ibtn" id='play'  onClick={()=> playAudio() }  type="button">Play Audio</button>
                    <button className="ibtn" id='pause' onClick={()=> pauseAudio() } type="button">Pause Audio</button> 
                    <div id="volume-controll">
                        <input type="range" id="volume-control" onChange={(e) =>  {document.getElementById("myAudio").volume= e.target.value/100;
                        console.log('volume=',document.getElementById("myAudio").volume);
                        
                          }} defaultValue="11.10" />
                    </div>
                 
                 
                </div>
                <div className="wrapper-star-wars-logo">
                    <img className="star-wars-logo" alt="starwars" src="https://starwarsintrocreator.kassellabs.io/logo.d5b4e999.svg" />
                </div>
                <div className="start-skip-intro">

               

                    <button className="start-intro ibtn" onClick={() => startIntro()}> Start Intro</button>
                    <a href="/" className="skip-intro"> Skip Intro</a>
                </div>
                <div className="wrapper">
                        <div id="scroll-text" className="scroll-text">
                        <h1>API WARS</h1> <br/>
                            <h3>EPISODE XVI</h3> <br/>
                          <br/>
                          

                            <pre>
                                {`
                Réges régen, 2020 október 26-án elindult
                a CodeCOOL frontend fejlesztés tanfolyam.

                Nagy szenvedések árán, bagollyá alakultunk,
                  de közben az erő és a nagy JODA mester 

                            alias @RICHARDatom

                    kitartóan bíztatott és velünk volt!

                      Átvállalt nagyon sok munkát,
                     állami online vizsga kérdések,  
                        6x6 teszt megírása, hogy 
                            éltessen az erő.
                
                        NAGYON KÖSZÖNJÜK Richárd!
                       Az összes FE csoport nevében.
                        
                           Mit szeretsz inni? 
                    Unicum, Whiskey, sör, bor, pálinka ?
                       (vagy ebbe a sorrendbe ? )

                Ennek köszönhetően sikerült eljutni, hogy
                       a 16-ik heti csoport feladat 
                              a FE2T6 csapata
                          Móni, Erika, Ágó, Dani, 
                  Journey Passport Solo (nem a Han Solo),
                Google, StackOverflow, Youtube segítségével
                        megcsinálta.(hihetetlen...)

                           Megtanítottál tanulni, 
                    a Google-t és Stackoverflow-t használni.
                    
                           A HATÁR A CSILLAGOS ÉG!

                 Ez az intró e videó útmutatásával készült el.
                  https://www.youtube.com/watch?v=kHrV2ZHzF-0
                 

                             B E M U T A T J U K 
                  
                     a React-os frontend STAR Wars API-t
                      Bootstrap és Express.js backend-el.
                                `}
                            </pre>
                               <br/>      
                               <h2>THE App.js</h2> 
                               <br/>      
                            <pre className="code">
                                {`
                    /* credits to:
                    
                    Journey Solo Passport
                    https://www.digitalocean.com//tutorials/how-to-add-login-authentication-to-react-applications
                    https://www.youtube.com/watch?v=-RCnNyD0L-s&ab_channel=WebDevSimplified

                    */                  

                    import React,{useState} from 'react';
                    import { BrowserRouter, Route, Switch } from 'react-router-dom';
                    import './App.css';
                    
                    import Intro        from  './components/Intro/intro.js';
                    import Login        from  './components/Login/Login2.js';
                    import Navbar       from  './components/Navbar/Navbar.js';
                    import ModalDialog  from  './components/Modal/Modal.js';
                    import Register     from  './components/Register/Register.js';
                    import PlanetList   from  './components/Planetlist/PlanetList.js';
                    import useToken     from  './useToken';

                    //import 'bootstrap-dist-css-bootdtrap.min.css'
                    import {Container, Row} from 'react-bootstrap';


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

                   
                        let intro = window.location.toString().indexOf('/intro')>-1;

                        if(!token) {
                            /* teljes login-is védelem esetén */
                            // return <Login setToken={setToken} />
                        }

                        return ( 
                          <div className="app-wrapper">
                            <h3>API Wars{token}</h3> 
                            
                            {!intro && <Navbar email={token} removeToken={removeToken} showVotes={showVotes}/>  }

                            <BrowserRouter>
                                <Switch>
                                <Route  path={ "/votingstats" } component={() => <Preferences />              } />
                                <Route  path={ "/login"       } component={() => <Login setToken={setToken} />} />
                                <Route  path={ "/register"    } component={() => <Register />                 } />
                                <Route  path={ "/logout"      } component={() => <Logout />                   } />
                                <Route  path={ "/intro"       } component={() => <Intro />                    } />
                                </Switch>
                            </BrowserRouter>
                            
                            <Container>
                                <Row> 
                                    <div className="votes-wrapper" style={{display:show ?'flex':'none'}}>
                                      <ModalDialog  show      = {show.toString()} 
                                                    setShow   = {setShow} 
                                                    modalData = {modalData} />
                                    </div>
                                </Row>
                                <Row>
                             
                                    { !intro &&  <PlanetList 
                                                    show = {show} setShow = {setShow} 
                                                    setModalData = {setModalData} token = {token} />
                                    }
                                </Row>
                            </Container> 
                          </div>

                    );
                    }

                    export default App;
                                
                      

                                `}

                       


                                
                            </pre>
                             <h3> Prepare for DEMO</h3>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                            <p> </p>
                        </div>
                </div>
           </div>
    )
}

export default intro
