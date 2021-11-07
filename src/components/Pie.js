// Imports
import * as d3 from 'd3';
import React from 'react';
import { useContext, useState, useRef } from "react";
import { GlobalStoreContext } from '../store';


function midAngle(d) { return d.startAngle + (d.endAngle - d.startAngle) / 2; } 

function translateAndRotate(position, d){
    position[0] = position[0] + 90*Math.sin(midAngle(d));
    if(midAngle(d) > 6 && midAngle(d) < 6.5){
        position[0] += (midAngle(d) - 6.22)*900;
    }
    position[1] = position[1] + 100*Math.sin(midAngle(d)-Math.PI/4);

    let coords = {};
    coords.position = position;
    coords.rotate = (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90 + (midAngle(d)<Math.PI ? 0 : 180));
    coords.vanish = 0;

    if((d.startAngle - d.endAngle)**2 < 0.0001){
        coords.vanish = 1;
    }

    return coords;

}

// Define width, height
const height = 258;
const width = 276;
const margin = 40;
const margin_top = 30;

export default function Pie() {

    // Set up context
    const { store } = useContext(GlobalStoreContext);

    // Set up state
    const [clicked, setClicked] = useState(0);

    // Create SVG object
    const svgRef = React.useRef(null);

    function definePieChart() {
        
        let radius = Math.min(width, height) / 2 - margin;
        
        // Clear svg content before adding new elements
        const svgEl = d3.select(svgRef.current);
        svgEl.selectAll("*").remove(); 
        const svg = d3.select(svgRef.current)
        // d3.select("svg")
            .attr("width", width + 2*margin + 10)
            .attr("height", height + 2*margin_top + 10)

        const appEl = d3.select('#app');
        appEl.select('.pie_data').remove(); 
        let pie_div = d3.select("#app").append("div")
            .attr("class", "pie_data")
            .style("opacity", 0)

        // Define variable name and data array
        let varName = "Type";
        let data = [];

        // Data is categorical
        let sum = 124; // parsed from project 2
        data = [{name: "Trad.", value: 250-sum}, {name: "Organic", value: sum}];

        const g = svg.append('g')
            .attr('transform', `translate(${margin + width/2}, ${margin + height/2})`)

        const pie = d3.pie().value(d => d.value);
        let color = d3.scaleOrdinal(d3.interpolateRainbow);

        color = d3.scaleOrdinal()
            .domain([124,126])
            .range([clicked!=1?"#30c514":"#3bed1a", clicked!=2?"#964B00":"#ba5d00"]);

        const path = d3.arc().outerRadius(radius).innerRadius(0);
        const label = d3.arc().outerRadius(radius).innerRadius(radius - 90);

        const pies = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

        pies.append('path').attr('d', path).attr('fill', d => color(d.data.value)).attr('opacity', function() {
            if((d3.select(this)._groups[0][0].__data__.value === 124?1:2) === clicked){
                return '0.5'
            }else{
                return '0.5'
            }
        })
        .on("click", function(e){
            // WHEN A ELEMENT OF THE PIE CHART IS CLICKED
            setClicked(d3.select(this)._groups[0][0].__data__.value === 124?1:2);
            store.updatePieChartClick(d3.select(this)._groups[0][0].__data__.value === 124?1:2);
        }).on("mouseover", function(e){
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '1');
            pie_div.transition()
                .duration(50)
                .style("opacity", 1);
            pie_div.text(d3.select(this)._groups[0][0].__data__.value + "/250")
                .style("left", (e.pageX - 50) + "px")
                .style("top", (e.pageY - 15) + "px");
        }).on("mouseout", function(e){
            if((d3.select(this)._groups[0][0].__data__.value === 124?1:2) != clicked){
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '0.5');
            }
            pie_div.transition()
                .duration(50)
                .style("opacity", 0);
        });
        
        pies.append('text')
            .text(d => d.data.name)
            .attr('transform', function(d) {
                let position = path.centroid(d);
                // console.log((180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90 + (midAngle(d)<Math.PI ? 0 : Math.PI/2)));
                // console.log(midAngle(d), Math.cos(midAngle(d)), Math.sin(midAngle(d)))
                position[0] = position[0] + 90*Math.sin(midAngle(d));
                // Scales values very close to 0
                if(midAngle(d) > 6 && midAngle(d) < 6.5){
                    position[0] += (midAngle(d) - 6.22)*900;
                }
                position[1] = position[1] + 100*Math.sin(midAngle(d)-Math.PI/4);
                return 'translate(' + (position) + ') ' + 'rotate(' + (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90 + (midAngle(d)<Math.PI ? 0 : 180)) + ')';
            })
            .attr("stroke", "black")
            // No need to show data if the category is barely visible.
            .attr('class', function(d){
                // console.log(d.startAngle - d.endAngle);
                if((d.startAngle - d.endAngle)**2 < 0.0001){
                    return "vanishLabel";
                }
                return "appearLabel"
            })

        let arcs = svg.selectAll('.arc')

        arcs.each(function(d,i) {

            let pathsLabel = d3.selectAll('path')._groups[0][i].__data__;

            let coords = {};
            coords = translateAndRotate(path.centroid(d), pathsLabel)

            if(coords.vanish == 1){
                // Draw no line
            }else{
                pies.append('line')
                .attr('x1', coords.position[0])
                .attr('y1', coords.position[1])
                .attr('x2', path.centroid(d)[0])
                .attr('y2', path.centroid(d)[1])
                .style("stroke-dasharray", ("10,3"))
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.8)
                .attr("stroke", "brown")
            }
        })
    }

    React.useEffect(() => {
        definePieChart();
    })

    return (
        <svg id="pie" ref={svgRef} width={width} height={height}></svg>
    );
}