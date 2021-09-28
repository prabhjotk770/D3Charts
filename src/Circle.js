import React,{useRef} from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3"
import {arc } from "d3";

const Circle = props => {
    // const ref = useRef();
    const centerX="380"
    const centerY="250"
   const mouthArc = d3.arc()
    .innerRadius(90)
    .outerRadius(100)
    .startAngle(Math.PI / 2)
    .endAngle(Math.PI * 3/2)
    return (
        <div  >
            <svg  width="960" height="500" >
            <g transform={`translate(${centerX},${centerY})`}>
                <circle  r="250" fill="yellow"
                stroke="black">
                </circle>
                <circle  r="40"
                cx="-90" 
                cy="-100"
                stroke="black">
                </circle>
                <circle  cx="110" 
                cy="-100" r="40" 
                stroke="black">
                </circle>
                <path d={mouthArc()}></path>
            </g>
           
            </svg>
        </div>
    );
};

Circle.propTypes = {
    
};

export default Circle;