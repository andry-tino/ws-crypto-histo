/**
 * index.js
 */

window.addEventListener("load", function() {
    attachNativeEvents();

    loadDataInChart("#histoLang", [{"letter":"A","frequency":0.08167},{"letter":"B","frequency":0.01492},{"letter":"C","frequency":0.02782},{"letter":"D","frequency":0.04253},{"letter":"E","frequency":0.12702},{"letter":"F","frequency":0.02288},{"letter":"G","frequency":0.02015},{"letter":"H","frequency":0.06094},{"letter":"I","frequency":0.06266},{"letter":"J","frequency":0.00153},{"letter":"K","frequency":0.00772},{"letter":"L","frequency":0.04025},{"letter":"M","frequency":0.02406},{"letter":"N","frequency":0.06749},{"letter":"O","frequency":0.07507},{"letter":"P","frequency":0.01929},{"letter":"Q","frequency":0.00095},{"letter":"R","frequency":0.05987},{"letter":"S","frequency":0.06327},{"letter":"T","frequency":0.09056},{"letter":"U","frequency":0.01258},{"letter":"V","frequency":0.00978},{"letter":"W","frequency":0.0236},{"letter":"X","frequency":0.0015},{"letter":"Y","frequency":0.01974},{"letter":"Z","frequency":0.00074}], "Language");
});

function attachNativeEvents() {
    var langCombo = document.getElementById("langCombo");
    langCombo.addEventListener("change", function(e) {
        console.log("change on langComgo", e);
    });

    var textInput = document.getElementById("textInput");
    textInput.addEventListener("input", function(e) {
        console.log("input on textInput", e);

        loadDataInChart("#histoText", [{"letter":"A","frequency":0.08167},{"letter":"B","frequency":0.01492},{"letter":"C","frequency":0.02782},{"letter":"D","frequency":0.04253},{"letter":"E","frequency":0.12702},{"letter":"F","frequency":0.02288},{"letter":"G","frequency":0.02015},{"letter":"H","frequency":0.06094},{"letter":"I","frequency":0.06966},{"letter":"J","frequency":0.00153},{"letter":"K","frequency":0.00772},{"letter":"L","frequency":0.04025},{"letter":"M","frequency":0.02406},{"letter":"N","frequency":0.06749},{"letter":"O","frequency":0.07507},{"letter":"P","frequency":0.01929},{"letter":"Q","frequency":0.00095},{"letter":"R","frequency":0.05987},{"letter":"S","frequency":0.06327},{"letter":"T","frequency":0.09056},{"letter":"U","frequency":0.02758},{"letter":"V","frequency":0.00978},{"letter":"W","frequency":0.0236},{"letter":"X","frequency":0.0015},{"letter":"Y","frequency":0.01974},{"letter":"Z","frequency":0.00074}], "Text frequencies");
    });
}

function loadDataInChart(svgId, data, title) {
    var svg = d3.select(svgId),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("y", height)
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .attr("fill", function(d) { return "rgb(0, 0, " + (d.frequency*1000) + ")"; })
        .transition()
        .duration(750)
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); });
    
    // Title
    svg.append("text")
        .attr("x", (svg.attr("width") / 2))             
        .attr("y", 12)
        .attr("text-anchor", "middle")  
        .style("font-size", ".7em") 
        .text(title);
}
