import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3"
import { feature } from 'topojson';
import * as topojson from 'topojson';

import "./water.csv"
// const url ="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json"
const url ="https://unpkg.com/world-atlas@2.0.2/countries-50m.json"
const csvurl = "https://gist.githubusercontent.com/prabhjotk770/c05fac5b3e27a00b946811d1e4ef509e/raw/fae47f239b01cae82780c053ca10f41cbda9f039/worldcities.csv"
const WorldMapPoints = props => {
  const [data, setdata] = useState(null)
  const [citiesData, setcitiesData] = useState(null)
  const width=2500
  const height = 1500
  const projection = d3.geoEqualEarth()
  const path = d3.geoPath().projection(projection);
    const row = d => {
        d.lat = +d.lat;
        d.lng = +d.lng;
        d.population = +d.population;
        return d;
    }

    const sizeValue = d => d.population;
    const maxRadius =15;

    const sizeScale = d3.scaleSqrt()
    .domain([0,d3.max(citiesData,sizeValue)])
    .range([0,maxRadius])
  useEffect(() => {
     d3.json(url).then(topojsonData => {
        
         const {countries} = topojsonData.objects
         setdata(feature(topojsonData,countries))
        // const {IND_adm1} = topojsonData.objects
        // setdata(feature(topojsonData,IND_adm1))
     })

     d3.csv(csvurl,row).then(setcitiesData)
    
  }, [])
 console.log(citiesData)
    return (
        <>
        <svg width={width} height={height}>
           <g style={{}} >
               {data && data?.features?.map(feature => (
                   <path width="960" height="500" d={path(feature)} fill="#ececec"  stroke="#c3c3c3"/>
               ))}
               {citiesData && citiesData?.map( d => {
                   const [x,y] = projection([d.lng,d.lat])
                   console.log(x,y)
                   return <circle cx={x} cy={y} r={sizeScale(sizeValue(d))} fill="#137B80" style={{opacity:"0.3"}}>

                   </circle>
               })}
           </g>
       </svg>
       
        </>
      
    );
};



export default WorldMapPoints;