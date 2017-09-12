/**
 * index.js
 */

window.addEventListener("load", function () {
    attachNativeEvents();

    // English is loaded at the beginning
    loadDataInChart("histoText", data_lang_nil, "Text frequencies");
    loadDataInChart("histoLang", data_lang_en, "English language");
});

function attachNativeEvents() {
    var langCombo = document.getElementById("langCombo");
    langCombo.addEventListener("change", function (e) {
        var value = e.target.value;
        if (value) {
            if (value === "dk") loadDataInChart("histoLang", data_lang_dk, "Danish language");
            else loadDataInChart("histoLang", data_lang_en, "English language");
        }

        // Logging
        console.log("change on langComgo", e);
    });

    var textInput = document.getElementById("textInput");
    var t = -1;
    textInput.addEventListener("input", function (e) {
        if (t > 0) return;

        t = window.setTimeout(function () {
            loadDataInChart("histoText", calculateTextStats(null), "Text frequencies");
            t = -1;

            // Logging
            console.log("input on textInput", e);
        }, 3000);
    });
}

function loadDataInChart(svgId, data, title) {
    var svgElement = document.getElementById(svgId);
    if (svgElement) cleanElement(svgElement);

    var svg = d3.select(`#${svgId}`),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d.letter; }));
    y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

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
        .attr("x", function (d) { return x(d.letter); })
        .attr("y", height)
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .attr("fill", function (d) { return "rgb(0, 0, " + (d.frequency * 1000) + ")"; })
        .transition()
        .duration(750)
        .attr("y", function (d) { return y(d.frequency); })
        .attr("height", function (d) { return height - y(d.frequency); });

    // Title
    svg.append("text")
        .attr("x", (svg.attr("width") / 2))
        .attr("y", 12)
        .attr("text-anchor", "middle")
        .style("font-size", ".7em")
        .text(title);
}

function updateDataInChart(svgId, data) {
    var svg = d3.select(`#${svgId}`),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;
    var g = d3.select(`${svgId} .axis--y`);

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(data.map(function (d) { return d.letter; }));
    y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.letter); })
        .attr("y", height)
        .attr("width", x.bandwidth())
        .attr("height", 0)
        .attr("fill", function (d) { return "rgb(0, 0, " + (d.frequency * 1000) + ")"; })
        .transition()
        .duration(750)
        .attr("y", function (d) { return y(d.frequency); })
        .attr("height", function (d) { return height - y(d.frequency); });
}

function cleanElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
