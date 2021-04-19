import React, {useState, useEffect} from 'react'
//import 'bootstrap-dist-css-bootdtrap.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import * as ReactBootStrap from 'react-bootstrap'
import {Container, Row, Col} from 'react-bootstrap';
import {Button,Modal} from 'react-bootstrap'
import People from '../../people.js'

//function Residents( props) {
    // props.data, props.title

function Residents( {data, title} ) {
const residentsURL = data

    
const [residentsData, setResidentsData] = useState()
const [planets, setPlanets] = useState(title)

const delayLoad = ()=> {
    console.log('delayedLoad=',People[0]);
    
    setResidentsData(People[0])
}

// useEffect újra fusson ha változik a city ami useState  - amikor választunk uj várost, onChange....
useEffect(() => {
    // adatbetöltése az URL-böl 
    console.log('useEffect=',People[0]);
    setResidentsData(undefined)
    setPlanets(title)
    setTimeout( delayLoad ,600) // ezzel van lelassitva a betoltes
}, [title])  // useState planetPage lapozásnál hívódik meg



    console.log(People[0]); 

    const [show,setShow] = useState(true)

    if (typeof(residentsData) === 'undefined')
    return (<div className="vote"><div  id="spinner"></div> </div>)

    let residents =[]
    //  http://swapi.dev/api/people/5/
    residentsURL.map((e,i) => residents.push(People[e.replace('http://swapi.dev/api/people/','').replace('/','')]) )
    console.log('residents=',residents);

    const columns =[ 
        {dataField: "name"          , text:"Name" },
        {dataField: "height"        , text:"Height" },
        {dataField: "mass"          , text:"Mass" },
        {dataField: "hair_color"    , text:"Hair color" },
        {dataField: "skin_color"    , text:"Skin color" },
        {dataField: "eye_color"     , text:"Eye color" },
        {dataField: "birth_year"    , text:"Birth year" },
        {dataField: "gender"        , text:"Gender" }
      ]

if (!show || !residents)    
    return ''
   return (<>
 {/*  { residentsURL.map((e,i) => <p><br/>{i} {residents[i]}</p>)} */}
 <div  className="residents">
 <BootstrapTable
      keyField="name"
      data={residents}
      columns={columns}
      >

      </BootstrapTable>
      </div>
</>
   )
}

export default Residents
