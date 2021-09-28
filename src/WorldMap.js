import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3"
import { feature } from 'topojson';
import * as topojson from 'topojson';
import "./water.csv"
const url ="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json"
// const url ="https://unpkg.com/world-atlas@2.0.2/countries-50m.json"
const WorldMap = props => {
  const [data, setdata] = useState(null)
  const [pieData, setpieData] = useState(null)
  const width=2500
  const height = 1500
  const projection = d3.geoMercator().center([81, 22]).scale(1200).translate([width / 2, height / 2]);
  const path = d3.geoPath().projection(projection);


  // set params of arc to be used inside pie
var arc = d3.arc()
.innerRadius(0)
.outerRadius(30);

// d3 pie object
var pie = d3.pie()
.sort(null)
.value(function (d) { return d; });

var color = d3.schemeCategory10;

function randomIntFromInterval(min, max) { // min and max included 
return Math.floor(Math.random() * (max - min + 1) + min)
}

  useEffect(() => {
     d3.json(url).then(topojsonData => {
         console.log(topojsonData)
        //  const {countries} = topojsonData.objects
        //  setdata(feature(topojsonData,countries))
        const {IND_adm1} = topojsonData.objects
        setdata(feature(topojsonData,IND_adm1))
     })


    //  d3.csv("./water.csv", function (error, water) {

    //     // Append one g element for each row in the csv and bind data to it:
    //     var points = g2.selectAll("g")
    //         .data(water)
    //         .enter()
    //         .append("g")
    //         .attr("transform", function (d) { return "translate(" + projection([d.lon, d.lat]) + ")" })
    //         .attr("id", function (d, i) { return "chart" + i; })
    //         .append("g").attr("class", "pies");


    //     // Select each g element we created, and fill it with pie chart:
    //     var pies = points.selectAll(".pies")
    //         .data(function () {
    //             return pie([0, randomIntFromInterval(1, 100),
    //                 randomIntFromInterval(1, 100), randomIntFromInterval(1, 100), randomIntFromInterval(1, 100)])
    //         }) // I'm unsure why I need the leading 0.
    //         .enter()
    //         .append('g')
    //         .attr('class', 'arc');

    //     pies.append("path")
    //         .attr('d', arc)
    //         .attr("fill", function (d, i) {
    //             return color[i];
    //         });

      
    // });
  }, [])
 
  console.log(data)
    return (
        <>
        <svg width={width} height={height}>
           <g style={{}} >
               {data && data?.features?.map(feature => (
                   <path width="960" height="500" d={path(feature)} fill="yellow"  stroke="black"/>
               ))}
           </g>
       </svg>
       <svg>
                <g>

                </g>

       </svg>
        </>
      
    );
};



export default WorldMap;