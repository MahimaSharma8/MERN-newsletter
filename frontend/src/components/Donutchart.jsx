import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Donutchart = () => {
    const ref = useRef();

    useEffect(() => {
        const margin = { top: 20, right: 20, bottom: 20, left: 20 };
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2 - Math.max(margin.top, margin.right, margin.bottom, margin.left);

        d3.csv("../query3.csv").then(function (data) {
            // Convert the count field to a number
            data.forEach(function (d) {
                d.count = +d.count;
                d.Words = d.Words.toLowerCase();
            });
            const stopWords = ["an", "the", "is", "this", "of", "on", "in", "at", "and", "a", "to","for","with","their","has","from","my","his","her","any","there","by","with","it","it's","its","will","am","would","are","shall","should","must","mustn't"];

            const filteredData = data.filter(d => !stopWords.includes(d.Words));


            const svg = d3
                .select(ref.current)
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            const color = d3
                .scaleOrdinal(d3.schemeRdGy[11])
                .domain(data.map((d) => d.Words));
               

            const pie = d3.pie().value((d) => d.count);
            const data_ready = pie(filteredData);

            const arc = d3
                .arc()
                .innerRadius(radius * 0.5)  // Donut chart: inner radius is non-zero
                .outerRadius(radius);

            svg
                .selectAll('path')
                .data(data_ready)
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', (d) => color(d.data.Words))
                .attr('stroke', 'black')
                .style('stroke-width', '2px')
                .style('opacity', 0.7);

            // Adding labels
            svg
                .selectAll('text')
                .data(data_ready)
                .enter()
                .append('text')
                .text((d) => d.data.Words)
                .attr('transform', (d) => `translate(${arc.centroid(d)})`)
                .style('text-anchor', 'middle')
                .style('font-size', '10px');
        });
    }, []);

    return <svg ref={ref} />;
};

export default Donutchart;
