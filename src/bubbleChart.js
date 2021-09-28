import React from "react"
import * as d3 from "d3";

 export function createBubbleChart(node, advImpact){
        const node 
        const advImpact 
        const format = d3.format(",d");
        const svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        const color = d3.scaleOrdinal(d3.schemeCategory20);

        const bubble = d3.pack(advImpact)
            .size([width, height])
            .padding(1.5);

        const nodes = d3.hierarchy(advImpact)
            .sum(function(d) { return d.id; });


        let getSelect = select(node)
            .selectAll('circle')
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        getSelect.append("circle")
            .attr("id", function(d) { return d.data.id; })
            .attr("r", function(d) { return d.r; })
            .style("fill", function(d) { console.log(d); return color(d.data.id); });

        getSelect.append("clipPath")
            .attr("id", function(d) { return "clip-" + d.data.id; })
            .append("use")
            .attr("xlink:href", function(d) { return "#" + d.data.id; });

        getSelect.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.id + ": " + d.data.title;
            });

        getSelect.append("title")
            .text(function(d) { return d.data.id + "\n" + format(d.value); });


    }

