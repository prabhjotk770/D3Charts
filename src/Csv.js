
import React,{useState,useEffect} from 'react';
import * as d3 from "d3"
const url ="https://gist.githubusercontent.com/prabhjotk770/37beadda9b1bb42f709b1ccd8013f24e/raw/6342b3f1dd0c6091177200fcb30182ec516d2322/csvData.csv"
const Csv = props => {
   
    const [data, setdata] = useState(null)
  
   
    useEffect(() => {
        d3.csv(url).then(data => {
            setdata(data)
        })
    }, [])
    const centerX="380"
    const centerY="250"
    const pieArc = d3.arc()
    .innerRadius(0)
    .outerRadius(960)

    const message = (data) => {
        let msg=""
        msg = msg + Math.round(d3.csvFormat(data).length/ 1024) + 'kb\n';
        msg = msg + data.length + 'rows\n';
        msg = msg +data.columns.length + 'columns\n';
        return msg
    }
    return (
        <svg width="960" height="500">
             <g transform={`translate(${centerX},${centerY})`}>
          
                {d3.pie()
                .value(1)(data)
                .map(d => (
                    <path 
                     fill={"#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);})}
                     d={pieArc(d)}
                    ></path>
                ))}


             {/* {data?.map((d,i) => {
                return <path 
                fill={"#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);})}
                d={pieArc({
                    startAngle:i/data.length *2 *Math.PI,

                    endAngle:(i+1)/data.length *2 *Math.PI,
                })}
                 >
                 </path>
             })}
           */}


           {/* {data? message(data):"Loading..."} */}
            </g>
        </svg>
       
    );
};

Csv.propTypes = {
    
};

export default Csv;