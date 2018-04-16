main();

function main() {       
    setupCanvasSize();
    appendSvg("body");
    setupXScale();
    setupYScale();
    appendXAxis();
    appendYAxis();
    appendLineCharts();
    addTitle();
    addCircles();
    addTextLabels();
    
};

function setupCanvasSize() {
  margin = { top: 200, left: 80, bottom: 20, right: 30 };
  width = 960 - margin.left - margin.right;
  height = 520 - margin.top - margin.bottom;
}
function appendSvg(domElement) {
  svg = d3.select(domElement).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    text = d3.select("body").append("text")
        .attr("class", "tooltip")
        .style("opacity", 0);
}
function setupXScale() {

  x = d3.scaleTime()
    .range([0, width])
    .domain(d3.extent(totalSales, function (d) { return d.month }));
}
function setupYScale() {
  var maxSales = d3.max(totalSales, function (d, i) {
    return d.sales;
  });

  y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, maxSales]);

}
function appendXAxis() {
  // Add the X Axis
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));
}
function appendYAxis() {
  // Add the Y Axis
  svg.append("g")
    .call(d3.axisLeft(y));
}
function appendLineCharts() {
  // define the line
  var valueline = d3.line()
    .x(function (d) { return x(d.month); })
    .y(function (d) { return y(d.sales); });
}
// draw circle for every register in TotalSales    
function addCircles(){
 svg.selectAll("circle")
    .data(totalSales)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.month) })
    .attr("cy", function (d) { return y(d.sales) })
    .attr("r", function (d) { return 10; })
    .on(["mouseover"], onMouseover)
    .on("mouseout", onMouseout)
    .call(force.drag);
}
// Add the valueline path.
function addValueline(){
  svg.append("path")
    .data([totalSales])
    .attr("class", "line")
    .attr("d", valueline);
}
//Add a Tittle
function addTitle() {
    svg.append("text")
        .attr("x", (width/2 ))
        .attr("y",-100  )
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("TOTAL SALES PER MONTH ");
};
//Show the message with mouse on
function onMouseover(d) {
    text.transition()
        .duration(20)
    //    .attr("x", function(d) { return x(d.label) - 30; })
        .style("opacity", .9)
        .attr("width", 600);
    createMessage(d);
};
//Hide the message with mouse off
function onMouseout(d) {
    text.transition()
        .duration(3000)
        .style("opacity", 0);
};
function createMessage(d) {
    text.html(
        "<text id='thumbnail'><span> IMPORTE:" + d.sales + "</text>")
        .style("left", (d3.event.pageX - 113) + "px")   
        .style("top", (d3.event.pageY - 190) + "px")
        .style("height", "220px")
        .style("width", "500px")
        .style("background", d3.rgb("#fdae6b"));
};