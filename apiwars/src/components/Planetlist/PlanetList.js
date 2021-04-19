import React,{useState, useEffect} from 'react'
//import 'bootstrap-dist-css-bootdtrap.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import {Container, Row, Col} from 'react-bootstrap';

import Planets from './../../data.js'

function PlanetList( {show, setShow, setModalData, token} ) {
    
    const [planetPage, setPlanetPage] = useState(0)
    const [planets, setPlanets] = useState()

    const delayLoad = ()=> {
        console.log('delayedLoad=',planetPage);
        setPlanets(Planets[planetPage].results)
    }

    // useEffect újra fusson ha változik a city ami useState  - amikor választunk uj várost, onChange....
    useEffect(() => {
        // adatbetöltése az URL-böl 
        console.log('planePage=',planetPage);
        setPlanets(undefined)
        setTimeout( delayLoad ,600) // ezzel van lelassitva a betoltes
    }, [planetPage])  // useState planetPage lapozásnál hívódik meg


    const showResidents = (residents,planet) =>{
         
                setModalData({type:'Residents',  title:'Residents of '+planet,planet:planet, data: residents})
                setShow(true)}

    const voting = (planet) =>{
                console.log('voting');
                setModalData({ type:'Vote', title:'Voting for ' + planet, content: "planet : "+planet+" "+token ,data:{"planet" : planet} } )
                setShow(true)}

const setPlanetPageFn = (e,inc) =>{
    e.preventDefault()
    setPlanetPage(planetPage === 0 ? 0 : planetPage + inc  )

}
    //console.log('planets=',planets,Planets[0].results);
    if(  (typeof(planets) ==='undefined'  )){ 
        console.log('typeof(planets)=',planets);
    return (
        <Container>
        <Row> {/* PlanetList PAGINATION */}
           <button  className="btn btn-warning" disabled onClick={() => setPlanetPage(planetPage === 0 ? 0 : planetPage - 1 ) }>Prev</button> &nbsp;
           <button  className="btn btn-warning" disabled onClick={() => setPlanetPage(planetPage === 5 ? 5 : planetPage + 1 ) }>Next</button> &nbsp; {planetPage+1} / 6
         </Row>
    <div className="vote"><img alt="halál csillag" width="150px" height="150px"
         src='https://media.discordapp.net/attachments/813853085247209512/817103188875673710/PngItem_1101336.png?width=568&height=567' />
         <div  id="spinner">
        </div><p>loading...</p> </div>
    </Container>
    )
    }


    console.log('typeof(planets)=',planets);
    //adatok formázása a table megjelenitéséhez. %, ezres csoportositas. Vote gomb mejgelenitese login esetén
    planets.map((e,i) => {

        e.surface_water = e.surface_water + (e.surface_water === 'unknown' || e.surface_water.indexOf('%')>-1  ? '':'%') 
    
        e.population    = e.population.indexOf('people')>-1 || e.population ==='unknown' 
                            ? e.population 
                            : (0+ e.population/1).toLocaleString()+ ' people'
    
        e.residents2    = (e.residents.length !== 0  
            ? <button className="btn btn-primary" onClick={() => showResidents(e.residents,e.name)}>
                  {e.residents.length} resident
              </button>
            :'No known residents') 
    
        e.vote= token ?  <button  className="btn btn-primary" onClick={() => voting(e.name)}>Vote</button> : token
    return ''
    }) 

    
    // react-table   adatmező  és          a fejléce
    const columns =[ 
        {dataField: "name"          , text:"Planet" },
        {dataField: "diameter"      , text:"Diameter" },
        {dataField: "climate"       , text:"Climate" },
        {dataField: "terrain"       , text:"Terrain" },
        {dataField: "surface_water" , text:"Surface water" },
        {dataField: "population"    , text:"Population" },
        {dataField: "residents2"    , text:"Residents" },
        {dataField: "vote"          , text:"" }
    ]
    if (!token) // ha nem vagyunk bejelentkezve kivesszük a "Vote" oszlopot.
          columns.length=columns.length-1 


    return (
       <Container>
          <Row> {/* PlanetList PAGINATION */}    {/* ha kisseb min */}
             <button  className="btn btn-warning" disabled={planetPage === 0  ||  typeof(planets) ==='undefined'  }
                      onClick={() => setPlanetPage(planetPage === 0 ? 0 : planetPage - 1 ) }>  Prev </button> &nbsp;
             <button  className="btn btn-warning" disabled={planetPage === 5 ||typeof(planets) ==='undefined'  } onClick={() => setPlanetPage(planetPage === 5 ? 5 : planetPage + 1 ) }>Next</button> &nbsp; {planetPage+1} / 6
           </Row>
           <Row> {/* Planet list Table */}
             <div className="planetList">
            { typeof(planets) ==='undefined' 
                 ? <div className="vote"><div  id="spinner"></div><p>loading...</p> </div>
                 : <BootstrapTable
                    keyField="name"
                    data={planets}
                    columns={columns} 
                   />
            }
             </div>
           </Row>
       </Container>
    )
}

export default PlanetList
