import React,{useState, useEffect} from 'react';
//import 'bootstrap-dist-css-bootdtrap.min.css'
import BootstrapTable from 'react-bootstrap-table-next'


export default function VoteStats() {

  const [votes,setVotes] = useState()

  useEffect(() => {
    fetch('http://localhost:8080/votestats')
     .then(response  => response.json())
     .then(result    => {console.log('Success:',result); setVotes(result);return result})
     .catch(error => console.log('Error:',error))
    }, [])



  const columns =[ 
    {dataField: "name"          , text:"Planet name" },
    {dataField: "votes"         , text:"Vote" }
  ]

  console.log('votes=',votes);
  if ( (typeof(votes) ==='undefined'  )){
    //console.log('votedata',votedata);
   
    return <div className="vote"><div  id="spinner"></div></div>
}
else    {
  return(
    <div  className="voteStats">            
 <BootstrapTable
      keyField="name"
      data={votes}
      columns={columns}
      >

      </BootstrapTable>
      </div>
  );
}
}