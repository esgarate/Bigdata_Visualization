
//*Define the color of each bar/product
var totalSales = [
    { product: 'Hoodie', sales: 7 , "color" : "green"},
    { product: 'Jacket', sales: 6 ,"color" : "purple"},
    { product: 'Snuggie', sales: 9 ,"color" : "red"},
    ];

var svg = d3.select('svg');

var rects = svg.selectAll('rect')
  .data(totalSales);

var maxSales = d3.max(totalSales, function(d, i) {
  return d.sales;
});

var x = d3.scaleLinear() 
  .domain([0, maxSales])
  .range([0, 350])
  ;

var y = d3.scaleBand()
  .rangeRound([0, 75])
  .domain(totalSales.map(function(d, i) {
    return d.product;
  }));

//* To show the chart vertically
setupCanvasSize();
appendSvg("body");
setupXScale();
setupYScale();
appendXAxis();
appendYAxis();
appendChartBars();
addLegend();



function addLegend()  {
//*Add a legend to the barchar
  var legend = svg.selectAll(".legend")
    .data(totalSales.slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
    .attr("x", 300)
    .attr("width", 10)
    .attr("height", 15)
    .style("fill", function (d) {return d.color});
  
  legend.append("text")
    .attr("x", 270)
    .attr("y", 10)
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function (d) { return d.product; });
  } 
function setupCanvasSize() {
    margin = {top: 100, left: 180, bottom: 120, right: 130};
    width = 960 - margin.left - margin.right;
    height = 800 - margin.top - margin.bottom;
  }
  
function appendSvg(domElement) {
    svg = d3.select(domElement).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
                ;
  }
    
function setupXScale()
  {
    x = d3.scaleBand()
      .rangeRound([0, width])
      .domain(totalSales.map(function(d, i) {
        return d.product;
      }))
  //* Add space between bars
      .paddingInner(0.30)
  }
  
  
function setupYScale()
  {
    var maxSales = d3.max(totalSales, function(d, i) {
      return d.sales;
    });
  
    y = d3.scaleLinear()
      .range([height,0])
      //* Add space between bars 
      .domain([0, maxSales]);    
  }
  
function appendXAxis() 
  {
    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  }
  
function appendYAxis() 
{
    //   
    // Add the Y Axis
    svg.append("g")   
  
    .call(d3.axisLeft(y));
  }
function appendChartBars()
{
  var rects = svg.selectAll('rect')
    .data(totalSales);

  var newRects = rects.enter();
  newRects.append('rect')
      .attr('x', function(d, i) {
        return x(d.product);
      })
      .attr('y', function(d) {
        return y(d.sales);
      })     
      .attr('height', function(d, i) {
        return height - y(d.sales);
      })
      .attr('width', x.bandwidth) 
      //* Change bar colors 
      .style("fill", function(d) {return d.color});     
      ;

}