import React, { useRef, useEffect,useState } from 'react';
import * as d3 from "d3";
import { useD3 } from "./UseD3";
import "./App.css"
import  "./world.json";
import "./water.csv"
import * as topojson from 'topojson';
const MapChart = props => {
   
    const [data1, setdata] = useState(null)
    // add svg element and set width and height
  
             var width = 2500;
        var    height = 1500;
    
    
const ref = useRef()
    var svg =d3.select(ref.current).append("svg")
    .attr("width", 2500)
    .attr("height", 1500);


// create map element and center at [lat, long]
var projection = d3.geoMercator().center([81, 22]).scale(1200).translate([width / 2, height / 2]);
var path = d3.geoPath().projection(projection);

// create the map in first svg group
var g1 = svg.append("g");



// create another svg group for pies
var g2 = svg.append("g");

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



    d3.csv("./water.csv", function (error, water) {

        // Append one g element for each row in the csv and bind data to it:
        var points = g2.selectAll("g")
            .data(water)
            .enter()
            .append("g")
            .attr("transform", function (d) { return "translate(" + projection([d.lon, d.lat]) + ")" })
            .attr("id", function (d, i) { return "chart" + i; })
            .append("g").attr("class", "pies");


        // Select each g element we created, and fill it with pie chart:
        var pies = points.selectAll(".pies")
            .data(function () {
                return pie([0, randomIntFromInterval(1, 100),
                    randomIntFromInterval(1, 100), randomIntFromInterval(1, 100), randomIntFromInterval(1, 100)])
            }) // I'm unsure why I need the leading 0.
            .enter()
            .append('g')
            .attr('class', 'arc');

        pies.append("path")
            .attr('d', arc)
            .attr("fill", function (d, i) {
                return color[i];
            });

      
    });


d3.json("./world.json",  (error, world) => {

     g1.insert("path", ".land")
           .datum(topojson.feature(world, world.objects.countries))
           .attr("class", "land")
           .attr("d", path);
   
       g1.append("path")
           .datum(topojson.mesh(world, world.objects.countries, function (a, b) { return a !== b; }))
           .attr("class", "mesh")
           .attr("d", path);
   
   });

//    d3.json("data.json").then(function(json){
//         data = data.concat(json);
//         render(data);
//     });
    return (
       
            <svg ref={ref} >
            <g>
     
                {/* {data.features.map(feature => (
                    <path d={path(feature)}></path>
                ))} */}
            </g>
            </svg>
        
        
    )


};



export default MapChart;