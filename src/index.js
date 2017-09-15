/**
 * index.js
 */

window.addEventListener("load", function () {
    attachNativeEvents();

    // English is loaded at the beginning
    loadDataInChart("histoText", data_lang_nil, "Text frequencies");
    loadDataInChart("histoLang", data_lang_en, "English language");

    // Initialize width for key input
    var keyInput = document.getElementsByClassName("keyInput")[0];
    //keyInput.style.width = `${Math.ceil(keyInput.clientWidth)}px`;

    showFlag("lang_en");
});

function attachNativeEvents() {
    // Language combobox
    var langCombo = document.getElementById("langCombo");
    langCombo.addEventListener("change", function (e) {
        var value = e.target.value;
        if (value) {
            if (value === "lang_dk") loadDataInChart("histoLang", data_lang_dk, "Danish language");
            else loadDataInChart("histoLang", data_lang_en, "English language");
        }

        showFlag(value); // Combo values supposed to match ids of flags

        // Logging
        console.log("change on langComgo", e);
    });

    // Text input react
    var textInput = document.getElementById("textInput");
    var refreshPeriod = 3000; // In milliseconds
    var t = -1;
    textInput.addEventListener("input", function (e) {
        var progress = document.getElementsByClassName("progress")[0];
        window.setTimeout(function(){
            progress.style.transition = "width 0s linear";
            window.setTimeout(function(){
                progress.style.width = "0px";
                window.setTimeout(function(){
                    progress.style.transition = `width ${refreshPeriod}ms linear`;
                    window.setTimeout(function(){
                        progress.style.width = "100%";
                    },0);
                },0);
            },0);
        },0);

        if (t > 0) window.clearTimeout(t);

        t = window.setTimeout(function () {
            var text = document.getElementById("textInput").textContent;
            loadDataInChart("histoText", calculateTextStats(text), "Text frequencies");
            t = -1;

            // Logging
            console.log("input on textInput", e);
        }, refreshPeriod);
    });

    textInput.addEventListener("paste", function (e) {
        var pastedText = "";
        if (window.clipboardData && window.clipboardData.getData) { // IE
            pastedText = window.clipboardData.getData('Text');
        } else if (e.clipboardData && e.clipboardData.getData) {
            pastedText = e.clipboardData.getData('text/plain');
        }

        e.preventDefault();
        document.getElementById("textInput").innerText = stripFormatting(pastedText);

        console.log("paste in textInput", e, "data:", e.clipboardData.getData("text/plain"));
    });

    // Decrypt button
    var decryptButton = document.getElementById("buttonDecrypt");
    decryptButton.addEventListener("click", function (e) {
        if (getKeyLength() != 26) {
            showTextInOutputBox(`Error, key must be 26 characters! You provided a key with ${getKeyLength()} characters.`);
            return;
        }

        showTextInOutputBox("Hello World!");
    });

    // Key box
    var keyInput = document.getElementsByClassName("keyInput")[0];
    keyInput.addEventListener("paste", function (e) {
        e.preventDefault(); // We don't let them paste in here
    });

    keyInput.addEventListener("input", function (e) {
        keyInput.textContent = keyInput.textContent.replace(/\n|\r|\s/g, "").toUpperCase().substr(0, 26);
    });
}

function loadDataInChart(svgId, data, title) {
    var svgElement = document.getElementById(svgId);
    if (svgElement) cleanElement(svgElement);

    if (!data) {
        loadDataInChart("histoText", data_lang_nil, "Text frequencies");
        return;
    }

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

    var paletteBright = d3.schemePaired;
    var paletteDark = d3.schemeDark2;
    var palette = paletteDark;

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
        .attr("fill", function (d) { return palette[letter2color(d.letter) % palette.length]; })
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

function cleanElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function letter2color(letter) {
    return {
        "a": 0, "b": 1, "c": 2, "d": 3, "e": 4,
        "f": 5, "g": 6, "h": 7, "i": 8, "j": 9,
        "k": 10, "l": 11, "m": 12, "n": 13, "o": 14,
        "p": 15, "q": 16, "r": 17, "s": 18, "t": 19,
        "u": 20, "v": 21, "w": 22, "x": 23, "y": 24, "z": 25
    }[letter.toLowerCase()];
}

function stripFormatting(html) {
    var tempDiv = document.createElement("DIV");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
}

function showFlag(code) {
    var flags = document.getElementsByClassName("lang-flag");
    
    for (let i = 0; i < flags.length; i++) {
        flags[i].style.display = flags[i].id == code ? "block" : "none";
    }
}

function showTextInOutputBox(text) {
    var box = document.getElementById("textOutput");
    
    box.textContent = text;
}

function getKeyLength(text) {
    return document.getElementsByClassName("keyInput")[0].textContent.length;
}
