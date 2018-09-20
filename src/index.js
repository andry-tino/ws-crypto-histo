/**
 * index.js
 */

(function () {
    let cm = null; // CodeMirror entry point

    window.addEventListener("load", function () {
        attachNativeEvents();

        // English is loaded at the beginning
        loadDataInChart("histoText", data_lang_nil, "Text frequencies");
        loadDataInChart("histoLang", data_lang_en, "English language");

        showFlag("lang_en");

        initializeCodeEditor();
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
            logInfo("change on langComgo", e);
        });

        // Text input react
        var textInput = document.getElementById("textInput");
        var refreshPeriod = 3000; // In milliseconds
        var t = -1;

        var updateOnInput = function (e) {
            var textBox = document.getElementById("textInput");
            textBox.style.backgroundColor = "#cccccc";

            if (t > 0) window.clearTimeout(t);

            t = window.setTimeout(function () {
                var resultFromCodedFunction = runCodedFunction();

                loadDataInChart("histoText", calculateTextStats(textBox.textContent), "Text frequencies");
                textBox.style.backgroundColor = ""; // Take from stylesheet
                t = -1;

                // Logging
                logInfo("input on textInput", e);
            }, refreshPeriod);
        }

        textInput.addEventListener("input", function (e) {
            updateOnInput(e);
        });

        textInput.addEventListener("paste", function (e) {
            // This is necessary to wait for the text to be 
            // rendered in the element and to be available here
            window.setTimeout(function () {
                var pastedText = textInput.innerText;
                textInput.innerText = stripFormatting(pastedText);

                updateOnInput(e);

                logInfo("paste in textInput", e, "data:", e.clipboardData.getData("text/plain"));
            }, 0);
        });

        // Key container (swapping animation)
        var keyContainer = document.getElementsByClassName("key-container")[0];
        var firstToSwap = null;
        keyContainer.addEventListener("click", function (e) {
            var target = e.target;

            if (!firstToSwap) {
                // First selection made
                firstToSwap = target;
                firstToSwap.classList.add("highlighted");
                return;
            }

            // Second selection made: swap!
            var secondPos = target.attributes.getNamedItem("data-pos").value;

            if (target !== firstToSwap) {
                var attr1 = document.createAttribute("data-pos");
                attr1.value = secondPos;
                var attr2 = document.createAttribute("data-pos");
                attr2.value = firstToSwap.attributes.getNamedItem("data-pos").value;

                firstToSwap.attributes.setNamedItem(attr1);
                target.attributes.setNamedItem(attr2);
            }

            // Clear state
            firstToSwap.classList.remove("highlighted");
            firstToSwap = null;
        });

        // Encrypt/Decrypt button
        var decryptButton = document.getElementById("buttonDecrypt");
        decryptButton.addEventListener("click", function (e) {
            decryptPlainAndShowCypher();
        });

        // Reset button
        var resetButton = document.getElementById("buttonReset");
        resetButton.addEventListener("click", function (e) {
            var keyContainer = document.getElementsByClassName("key-container")[0];
            var keys = keyContainer.children;

            for (let i = 0, l = getKeyLen(); i < l; i++) {
                var key = keys[i];

                var attr = document.createAttribute("data-pos");
                attr.value = `${i + 1}`;

                key.attributes.setNamedItem(attr);
            }
        });

        // Random button
        var rndButton = document.getElementById("buttonRnd");
        rndButton.addEventListener("click", function (e) {
            var keyContainer = document.getElementsByClassName("key-container")[0];
            var keys = keyContainer.children;
            var newPosArray = durstenfeldShuffle("1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26".split(","));

            for (let i = 0, l = getKeyLen(); i < l; i++) {
                var key = keys[i];

                var attr = document.createAttribute("data-pos");
                attr.value = newPosArray[i];

                key.attributes.setNamedItem(attr);
            }
        });

        // Dual button
        // var dualButton = document.getElementById("buttonDual");
        // dualButton.addEventListener("click", function (e) {
        //     var keyInput = document.getElementsByClassName("keyInput")[0];

        //     var initial = keyInput.textContent;
        //     if (initial && initial.length > 0) {
        //         keyInput.textContent = generateDual(initial);
        //     }
        // });
    }

    function decryptPlainAndShowCypher() {
        var inputBox = document.getElementById("textInput");
        var key = extractKey();

        showTextInOutputBox(
            checkKeyAndDecrypt(key,
                function () {
                    return decryptCypherText(inputBox.textContent, key);
                }
            )
        );
    }

    function getKeyLen() {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
    }

    function extractKey() {
        var keyContainer = document.getElementsByClassName("key-container")[0];
        var keys = keyContainer.children;

        var str = new Array(getKeyLen());
        for (var key of keys) {
            var value = key.attributes.getNamedItem("data-value").value;
            var pos = parseInt(key.attributes.getNamedItem("data-pos").value);

            str[pos] = value;
        }

        return str.join("");
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

    function runCodedFunction() {
        var src = cm.getValue();
        logInfo("retrieved code from CM", src);

        var extendedSrc = `(${src})(document.getElementById("textInput").textContent)`;
        logInfo("computed extended code", extendedSrc);

        // Execute
        try {
            var res = eval(extendedSrc);
        } catch (e) {
            logErr("error while evaluating coded function", e);
        }

        logInfo("successfully evaluated coded function", res);
    }

    function initializeCodeEditor() {
        cm = CodeMirror(document.getElementById("codeInput"), {
            value: "function getFrequencies(text) {\n\t// You code here\n\t// Variable 'text' contains the plain text\n}",
            mode: "javascript",
            lineNumbers: true,
            dragDrop: false,
            tabSize: 2
        });

        cm.setSize(290, 250);
    }
})()
