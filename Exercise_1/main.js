
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
  .range([0, 350]);

var y = d3.scaleBand()
  .rangeRound([0, 75])
//* Add space between bars 
  .paddingInner(0.15)
  .domain(totalSales.map(function(d, i) {
    return d.product;
  }));

var Yaxisnew = d3.scaleLinear()
    .domain([0, maxSales])
    .range([0, 350]);

var XAxisNew = d3.scaleBand()
    .rangeRound([0, 75])
    .domain(totalSales.map(function (d, i) {
        return d.product;
    })).padding(0.05);


var newRects = rects.enter();


newRects.append('rect')
.attr('x', function (d, i) {
  return XAxisNew(d.product);
  })
  .attr('y', function (d, i) {
    return Yaxisnew(0)
  })
.attr('height', function (d, i) {
    return Yaxisnew(d.sales);
})
  .attr('width', XAxisNew.bandwidth)
  
 //* cCange bar colors 
  .style("fill", function(d) {return d.color});

 
  
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
  