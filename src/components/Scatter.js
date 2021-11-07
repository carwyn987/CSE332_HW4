// Imports
import * as d3 from 'd3';
import React from 'react';
import { useContext, useState, useRef } from "react";
import { GlobalStoreContext } from '../store';

// export default function Scatter() {
export const Scatter = (props) => {

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


    // SCATTER PLOT CODE:

    let varName = "Average Price";
    let var2Name = "Production";

    Promise.resolve(store.dataValues).then(function(d) {
        setData(store.dataValues);

        let data = new Array(d.length);
        for(let i = 0; i<d.length; i++){
            data[i] = new Object();
            data[i].val1 = parseFloat(d[i][varName]);
            data[i].val2 = parseFloat(d[i][var2Name]);
        }

        // svg.append("g").attr("stroke", "white")
        //     .attr("fill", "white").attr("transform", "translate(" + (0 + margin_horz) + "," + (margin_vert+10) + ")");

        let x = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d.val1; })])
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

        let y = d3.scaleLinear()
            .range([height, 0]);
            y.domain([d3.min(data, function(d) { return d.val2; }) - 0.2, d3.max(data, function(d) { return d.val2; }) + .2]);
        svg.append("g")
            .attr("transform", "translate(" + (margin_horz+20) + "," + margin_vert + ")")
            .attr("stroke-width", ".5")
            .attr("stroke", "white")
            .attr("fill", "white")
            .call(d3.axisLeft(y));

        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.val1) + 30; } )
            .attr("cy", function (d) { return y(d.val2) + margin_vert + 2*Math.random() - 1; } )
            .attr("r", 1.2)
            .style("fill", "lightgreen")

        svg.selectAll("path")
            .attr("stroke", "white")
            .attr("fill", "white");

        // X AXIS
        svg.append('text')
            .attr("x", 3*width/8 + margin_horz + 10)
            .attr("y", height+ 50 + margin_vert)
            .attr("stroke", "white")
            .attr("fill", "white")
            .text(varName);

        // Y AXIS
        svg.append('text')        
            .attr("transform", 'translate(' + (margin_horz + 20) + ',0)' + "rotate(-90) ")
            .attr("y", 30-margin_vert)
            .attr("x", 0 - (height/2) - 1.5*margin_vert)
            .attr("stroke", "white")
            .attr("fill", "white")
            // .attr('transform', 'translate(' + width/2 + ', ' + height - margin.bottom + ')')
            .text(var2Name);

        // TITLE
        svg.append('text')
            .attr("x", 3*width/8 + 50)
            .attr("y", margin_vert - 10)
            .text(var2Name + " vs " + varName)
            .attr("stroke", "white")
            .attr("fill", "white")
        
        // END SCATTER PLOT CODE
    })

    return (
        <svg id="scatter" ref={svgRef} width={width+2*margin_horz} height={height+2*margin_vert}></svg>
    );
}