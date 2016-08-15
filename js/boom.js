var blocks = [];                        //Initialize empty array
for (var i = 0; i < 100000; i++) {           //Loop 25 times
    var newNumber1 = (Math.random()-0.5) * 50;  //New random number (0-30)
    var newNumber2 = (Math.random()-0.5) * 50;  //New random number (0-30)
    blocks.push([newNumber1,newNumber2]);             //Add new number to array
}

var width = 1000,
    height = 450;

var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);

var button = d3.select("#button"),
    buttoff = d3.select("#butoff");

var projection = d3.geo.mercator()
	.center([2.3488000,48.8534100])
	.scale(170000)
	.translate([width/2,height/1.7]);


var path = d3.geo.path()
    .projection(projection);


// What happens when we click on the button
button.on("click", function() {
	console.log("click");
  svg.selectAll("path")
  	.data(blocks)
  	.transition().duration(10000)
	  	.attr("transform", function(d) { return "translate(" + d[0] + "," + d[1] + ") scale(1, 1)"; })
});


buttoff.on("click", function() {
	console.log("click");
  svg.selectAll("path")
  	.data(blocks)
  	.transition().duration(10000)
	  	.attr("transform", function(d) { return "translate(" + 0 + "," + 0 + ") scale(1, 1)"; });
});




d3.json("data/cities/paris.json", function(error, city) {

	// Plot the world map
	svg.selectAll("path")
		.data(city.features)
			.enter().append("path")
				.attr("class","block")
				.attr("d", path);


});


