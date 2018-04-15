
let margin = null,
  width = null,
  height = null;



let svg = null;
let x, y = null; // scales




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
//var circles = 

function addCircles(){
 svg.selectAll("circle")
    .data(totalSales)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.month) })
    .attr("cy", function (d) { return y(d.sales) })
    .attr("r", function (d) { return 10; })
    // Add the click
    //.attr("class", function (d) { return "node "+d.label })
    //.on("click", click)
    .call(force.drag);
}


  // Add the valueline path.
function addValueline(){
  svg.append("path")
    .data([totalSales])
    .attr("class", "line")
    .attr("d", valueline);
}

function addTitle() {
    svg.append("text")
        .attr("x", (width/2 ))
        .attr("y",-100  )
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("TOTAL SALES PER MONTH ");
};

function onClick(d) {
    div.transition()
        .duration(200)
        .style("opacity", .9);

    createTooltip(d);
};

function onMouseout(d) {
    div.transition()
        .duration(3000)
        .style("opacity", 0);
};

