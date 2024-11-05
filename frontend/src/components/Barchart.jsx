import * as d3 from "d3";
import { useEffect, useRef } from "react";
const Barchart = () => {
    const ref = useRef();
  
    useEffect(() => {
  
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 660 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const svg = d3
    .select(ref.current)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);



    // Load the CSV file and create the bar chart
d3.csv("../likes.csv").then(function(data) {
    // Convert article_id and likes to numbers
    data.forEach(function(d) {
        d.article_id = +d.article_id;
        d.likes = +d.likes;
    });

    // Set up the X and Y scales
    var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.Article_id; }))
        .range([0, width])
        .padding(0.2); // Adds space between bars

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.likes; })])
        .range([height, 0]);

    // Append X and Y axes
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    // Create bars for the chart
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.Article_id); })
        .attr("y", function(d) { return y(d.likes); })
        .attr("width", x.bandwidth()) // Automatic bar width
        .attr("height", function(d) { return height - y(d.likes); })
        .attr("fill", "#56040f");

        
});}, []);
return <svg width={860} height={400} id="barchart" ref={ref} />;
};
export default Barchart;