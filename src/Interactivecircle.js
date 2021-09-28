import React,{useState} from 'react';
import PropTypes from 'prop-types';

const Interactivecircle = props => {
    const width =960
    const height =500
    const radius = 30
    const initialValues= {x: width/2, y:height/2}
    const [mousePosition, setmousePosition] = useState(initialValues)
    const handleMouse = (event) => {
        
        setmousePosition({x:event.clientX, y:event.clientY})
    }
    return (
        <svg width={width} height={height} onMouseMove={handleMouse}>
            <circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r={radius}
            fill="red">

            </circle>
        </svg>
    );
};

Interactivecircle.propTypes = {
    
};

export default Interactivecircle;