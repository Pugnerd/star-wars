import React,{useState} from 'react';
import usersIcon from './usersIcon.png'
import databseIcon from './databaseReset.png'
import votesIcon from './votesIcon.png'

import './dashboard.css'

export default function Dashboard() {

  const [show,setShow] = useState()

  const resetDb = ()=>( alert('reseting db.... not implemented yet.'))
  const showUsers = ()=>( alert('showing users list.... not implemented yet.'))
  const showVoteList = ()=>( alert('showing votes data .... not implemented yet.'))
  return(
    <div className="dashboard">
   
    <div className="card"  onClick={()=> showUsers()}>
      Users
      <img src={usersIcon} alt="users" />
    </div>
    <div className="card"  onClick={()=> showVoteList()}>
      Votes
      <img src={votesIcon} alt="showVotes" />
    </div>
    <div className="card" onClick={()=> resetDb()}>
      Database reset
      <img src={databseIcon} alt="database" />
    </div>
    </div>
  );
}