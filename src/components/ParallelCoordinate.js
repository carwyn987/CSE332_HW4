// Imports
import * as d3 from 'd3';
import React from 'react';
import { useContext, useState, useRef } from "react";
import { GlobalStoreContext } from '../store';

export const ParallelCoordinate = () => {

    // Set up context
    const { store } = useContext(GlobalStoreContext);

    // Set up state
    const [data, setData] = useState([]);
    const [selection, setSelection] = useState({
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0

    });

    let MOUSEDOWN = 0;

    // Create SVG object
    const svgRef = React.useRef(null);

    const width = 950;
    const height = 290;
    const margin_horz = 70;
    const margin_vert = 30;

    // Clear svg content before adding new elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); 
    const svg = d3.select(svgRef.current)
    // d3.select("svg")
        .attr("width", width + 2*margin_horz)
        .attr("height", height + 2*margin_vert + 10)


    // ADDED CODE

    Promise.resolve(store.dataValues).then(function(d) {
        setData(d);

        // Clear svg content before adding new elements
        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove(); 

        d.forEach(function(d) {
            d["4046"] = parseInt(d["4046"]);
            d["Total Volume"] = parseInt(d["Total Volume"]);
            d["Total Bags"] = parseInt(d["Total Bags"]);
            d["Small Bags"] = parseInt(d["Small Bags"]);
            d["Large Bags"] = parseInt(d["Large Bags"]);
            d["4225"] = parseInt(d["4225"]);
            d["4770"] = parseInt(d["4770"]);
            d["Average Price"] = parseFloat(d["Average Price"]);
            d["XLarge Bags"] = parseInt(d["XLarge Bags"]);
            d["Type"] = parseInt(d["Type"]);
            d["Production"] = parseFloat(d["Production"]);
        });

        // Make array of property names
        let properties = ["Total Volume", "4046", "Small Bags", "Total Bags","Large Bags","4225","4770","Average Price", "XLarge Bags", "Type", "Production"];

        // Create the scale for each property
        let y = {}
        for(let i = 0; i<11; i++){
            let name = properties[i];
            if(name != "Average Price" && name != "Type" && name != "Production")
            {
                y[name] = d3.scaleLog()
                            .domain([1, d3.max(data, function(d){
                                return d[name];
                            }) + 1])
                            .range([height, 0]);
            }else{
                y[name] = d3.scaleLinear()
                            .domain([0, d3.max(data, function(d){
                                return d[name];
                            }) + 1])
                            .range([height, 0]);
            }
        }

        // Create the x axis
        let x = d3.scalePoint()
                .range([0, width + 2*margin_horz + 10])
                .padding(1)
                .domain(properties)

        function path(d) {
            return d3.line()(properties.map(function(p){
                return [x(p), y[p](d[p])];
            }));
        }

        let shiftRight = 0;
        let shiftDown = 37;

        // Create each data objects path line
        let foreground = svg.selectAll("Path")
            .data(data)
            .enter().append("path")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", store.color)
            .style("opacity", 0.5)
            .attr("transform", "translate(" + shiftRight + ", " + shiftDown + ")")

        // Create each data objects path line
        let background = svg.append("g")
            .attr("class", "background")
            .selectAll("path")
            .data(data)
            .enter().append("path")
            .attr("d", path)
            .style("stroke", "lightgray")
            .style("opacity", 0.5)
            .attr("transform", "translate(" + shiftRight + ", " + shiftDown + ")");


        // Axis titles and scales
        let axes = svg.selectAll("Axis")
            .data(properties).enter()
            .append("g")
            .attr("class", "noselect")
            .style("stroke", "white")
            .style('fill', 'white')
            .style("font-size", '11px')
            .style("stroke-width", '.8')
            .attr("transform", function(d) {
                return "translate(" + (x(d) + shiftRight) + ", " + shiftDown + ")";
            })
            .each(function(d) {
                d3.select(this).call(d3.axisLeft().scale(y[d]));
            })
            .append("text")
                .style("text-anchor", "middle")
                .attr("y", -9)
                .text(function(d){
                    return d;
                })
                .attr("stroke", "white")
                .attr("fill", "white")
                .style("font-weight", "bold")

        

    });

    function handleDragStart(event) {
        MOUSEDOWN = 1;
        console.log("down", event)
        setSelection({
            startX: event.clientX,
            startY: event.clientY,
            endX: selection.endX,
            endY: selection.endY
        });
    }

    function handleDrop(event) {
        MOUSEDOWN = 0;
        console.log("up", event)
        setSelection({
            startX: selection.startX,
            startY: selection.startY,
            endX: event.clientX,
            endY: event.clientY
        });
    }

    // END OF ADDED CODE

    return (
        <div id="parallel_coordinate_div" onMouseDown={handleDragStart} onMouseUp={handleDrop}>
            <svg id="parallel_coordinate" ref={svgRef} width={width+2*margin_horz} height={height+2*margin_vert}></svg>
            <div id="selection" style={{width: (selection.endX - selection.startX)>60?60:(selection.endX - selection.startX), height: selection.endY - selection.startY, left: selection.startX - margin_horz - 10, top: selection.startY - margin_vert - 30}}></div>
        </div>
    );
}