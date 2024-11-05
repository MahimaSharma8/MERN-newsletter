import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Linechart = () => {
    const ref = useRef();

    useEffect(() => {
        // set the dimensions and margins of the graph
        const svg = d3.select(ref.current);
        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        svg.attr('width', width).attr('height', height);

        // Create a group for the plot area
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        d3.csv("../query2.csv").then(function (data) {
            data.forEach(function (d) {
                d.likes = +d.likes; // Convert likes to numeric

            });

            // Set up the X and Y scales
            const x = d3.scaleBand() 
                .domain(data.map(d => d.Author)) 
                .range([0, innerWidth])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.likes)])
                .range([innerHeight, 0]);

            // Create the line 
            const line = d3.line()
                .x(d => x(d.Author) + x.bandwidth() / 2)  
                .y(d => y(d.likes));  

            // Append the path for the line
            g.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', '#56040f')
                .attr('stroke-width', 2.7)
                .attr('d', line);

            // Append the X axis (with text labels)
            g.append('g')
                .attr('transform', `translate(0,${innerHeight})`)
                .call(d3.axisBottom(x))
                .selectAll("text")  
                .attr("transform", "rotate(-20)")
                .style("text-anchor", "end");

            // Append the Y axis
            g.append('g')
                .call(d3.axisLeft(y));

        }).catch(error => {
            console.error("Error loading or parsing data:", error);
        });

    }, []);

    return <svg ref={ref} />;
};

export default Linechart;
