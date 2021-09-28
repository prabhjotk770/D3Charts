
    import React,{useState,useEffect,useRef} from 'react';
    import PropTypes from 'prop-types';
    import * as d3 from "d3"
    import { feature } from 'topojson';
    import * as topojson from 'topojson';
    
    const url ="https://unpkg.com/world-atlas@2.0.2/countries-50m.json"
    // const url ="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json"
    const csvurl = "https://gist.githubusercontent.com/prabhjotk770/aea87f386851f868be002219b700ebde/raw/baa6fd0bd6d8f6a02895d81f3d4b4a755743148c/indiapie.csv"
    const IndiaMap = props => {
      const [data, setdata] = useState(null)
      const [pieData, setpieData] = useState(null)

      const width=2500
      const height = 1500

      const ref= useRef()

      // create map element and center at [lat, long]
      var projection = d3.geoMercator().center([81, 22]).scale(1200).translate([width / 2, height / 2]);
      var path = d3.geoPath().projection(projection);
      
      useEffect(() => {
         d3.json(url).then(topojsonData => {
            // const {IND_adm1} = topojsonData.objects
            // setdata(feature(topojsonData,IND_adm1))
            setdata(topojsonData)
         })
    
         d3.csv(csvurl).then(setpieData)

      }, [])
      useEffect(() => {
       pieData && drawPie()
      }, [pieData])
      useEffect(() => {
        data &&  drawMap()
      }, [data])



      // set params of arc to be used inside pie
        var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(30);

        // d3 pie object
        var pie = d3.pie()
        .sort(null)
        .value(function (d) { return d; });

        var color = d3.schemeCategory10;
        // console.log(pieData,pies,arc,color,projection)

        function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
        }

        var svg =d3.select(ref.current).append("svg")
        // create another svg group for pies
        var g2 = svg.append("g")
        // create the map in first svg group
var g1 = svg.append("g")
const drawMap = () => {
    g1.insert("path", ".land")
   .datum(topojson.feature(data, data.objects.countries))
   .attr("class", "land")
   .attr("d", path);

g1.append("path")
   .datum(topojson.mesh(data, data.objects.countries, function (a, b) { return a !== b; }))
   .attr("class", "mesh")
   .attr("d", path);

}
        const drawPie = () => {
            var points = g2.selectAll("g")
                    .data(pieData)
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

        }


   
        return (
            <>
            <svg width={width} height={height} ref={ref}>

             {/* draw map */}
               <g >
                   {/* {data && data?.features?.map(feature => (
                    <path width="960" height="500" d={path(feature)} fill="#ececec"  stroke="#c3c3c3"/>
                   ))} */}

               </g>

         {/* draw pie */}

               {/* {pieData?.map(d => {
                   console.log(`translate(${projection([d.lon, d.lat])})`)
                  return  <g  transform={`translate(${projection([d.lon, d.lat])})`}>
                        {pies.map((el,i) => {
                            return <path d={arc} fill={color[i]}></path>
                        })}
                  </g>
                   })} */}
                   <g></g>
               
           </svg>
           
            </>
          
        );
    };
    
    
    
    export default IndiaMap;

