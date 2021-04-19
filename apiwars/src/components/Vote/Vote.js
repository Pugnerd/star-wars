import React,{useState, useEffect} from 'react'

async function registerVote(data,setVoteData) {
    const dt = await fetch('http://localhost:8080/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(data => data.json())
      setVoteData(dt)
      return dt
   }
   

function Vote({data,title}) {

    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    const [votedata,setVoteData] = useState(undefined)
    const [planet,setPlanet] = useState('')
    let VoteData = new FormData()
    VoteData.append('user','erika')
    VoteData.append('planet','planet')
   let email=userToken.email


  useEffect( () => {

        let URL = 'http://localhost:8080/vote'
        const resp =  registerVote({
          planet,
          email
        },setVoteData);
        console.log('URL=',URL);
   
    }, [planet])  // useEffect urja fusson ha változik a date ami useState  - amikor választunk uj dáutomt, onChange....
     
    // ha valtozik a planet vote akkor ujra rendereljuk.
    if (planet !==data.planet)    
          setPlanet(data.planet)

    if ( (typeof(votedata) ==='undefined'  ))
        return <div className="vote"> saving vote... <div  id="spinner"></div></div>
    else   
      return (
        <div className="vote">
           <p> Thank you for your voting!</p>
           <p> This planet now has {votedata.voteNo} votes.</p>
        </div>
    )
}

export default Vote
