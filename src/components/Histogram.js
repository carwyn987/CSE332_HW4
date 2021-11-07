// Imports
import * as d3 from 'd3';
import React from 'react';
import { useContext, useState, useRef } from "react";
import { GlobalStoreContext } from '../store';

// export default function Scatter() {
export const Histogram = (props) => {

    // Set up context
    const { store } = useContext(GlobalStoreContext);

    // Set up state
    const [data, setData] = useState([]);

    // Create SVG object
    const svgRef = React.useRef(null);

    const width = 400;
    const height = 280;
    const margin_horz = 70;
    const margin_vert = 70;

    // Clear svg content before adding new elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); 
    const svg = d3.select(svgRef.current)
    // d3.select("svg")
        .attr("width", width + 2*margin_horz)
        .attr("height", height + 2*margin_vert + 10)


    // HISTOGRAM CODE:

    let varName = "Average Price";

    Promise.resolve(store.dataValues).then(function(d) {
        setData(store.dataValues);

        let data = new Array(d.length);
        for(let i = 0; i<d.length; i++){
            data[i] = parseFloat(d[i][varName]);
        }

        let x = d3.scaleLinear()
            .domain([Math.min.apply(null, data), Math.max.apply(null, data)+1])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(" + (margin_horz+20) + "," + (height + margin_vert) + ")")
            .attr("stroke", "white")
            .attr("fill", "white")
            .attr("stroke-width", ".5")
            .call(d3.axisBottom(x))
            .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("transform", "translate(0,10) rotate(-70)")
                    .attr("stroke", "white")
                    .attr("fill", "white")
                    .attr("font-size", "9")

        // BEGINNING ADDED CODE            
        
        let histogram = d3.histogram()
            .domain(x.domain())
            .thresholds(x.ticks(10));

        let bins = histogram(data);

        // END ADDED CODE

        let y = d3.scaleLinear()
            .range([height, 0]);
            y.domain([0, d3.max(bins, function(d) { return d.length; })]);
        svg.append("g")
            .attr("transform", "translate(" + (margin_horz+20) + "," + margin_vert + ")")
            .attr("stroke-width", ".5")
            .attr("stroke", "white")
            .attr("fill", "white")
            .call(d3.axisLeft(y));

        // ADD CODE
        svg.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + (x(d.x0) + margin_horz + 20) + "," + (y(d.length) + margin_vert) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", store.color)
        // END ADD CODE
            

        svg.selectAll("path")
            .attr("stroke", "white")
            .attr("fill", "white");

        // X AXIS
        svg.append('text')
            .attr("x", 3*width/8 + margin_horz + 10)
            .attr("y", height+ 50 + margin_vert)
            .attr("stroke", "white")
            .attr("fill", "white")
            .text("Frequency");

        // Y AXIS
        svg.append('text')        
            .attr("transform", 'translate(' + (margin_horz + 20) + ',0)' + "rotate(-90) ")
            .attr("y", 30-margin_vert)
            .attr("x", 0 - (height/2) - 1.5*margin_vert)
            .attr("stroke", "white")
            .attr("fill", "white")
            // .attr('transform', 'translate(' + width/2 + ', ' + height - margin.bottom + ')')
            .text(varName);

        // TITLE
        svg.append('text')
            .attr("x", 3*width/8 + 50)
            .attr("y", margin_vert - 10)
            .text(varName + " Histogram")
            .attr("stroke", "white")
            .attr("fill", "white")
        
        // END SCATTER PLOT CODE
    })

    return (
        <svg id="histo" ref={svgRef} width={width+2*margin_horz} height={height+2*margin_vert}></svg>
    );
}