import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import $ from "jquery";
import "./index.css";
const SortableBarChart = ({ chartId }) => {
  const [val, setVal] = useState([]);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (seconds % 5 === 0) {
      var dummyAlphabet = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];

      var data = [];
      dummyAlphabet.forEach((letterDummy) => {
        var precision = 1000;
        var randomnum =
          Math.floor(
            Math.random() * (10 * precision - 1 * precision) + 1 * precision
          ) /
          (1 * precision);
        data.push({ letter: letterDummy, frequency: randomnum });
      });
      setVal(data);
    }
  }, [seconds]);
  useEffect(() => {
    $("." + chartId).empty();
    if (val !== []) {
      var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 660 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

      var formatPercent = d3.format(".0%");

      var x = d3.scaleBand().rangeRound([0, width]);

      var y = d3.scaleLinear().range([height, 0]);

      var xAxis = d3.axisBottom(x);

      var yAxis = d3.axisLeft(y).tickFormat(formatPercent);

      var svg = d3
        .select("." + chartId)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      val.forEach(function (d) {
        d.frequency = +d.frequency;
      });

      x.domain(
        val.map(function (d) {
          return d.letter;
        })
      );
      y.domain([
        0,
        d3.max(val, function (d) {
          return d.frequency;
        }),
      ]);

      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      svg
        .append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

      svg
        .selectAll(".bar")
        .data(val)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
          return x(d.letter) + 2;
        })
        .attr("width", x.bandwidth() - 5)
        .attr("y", function (d) {
          return y(d.frequency);
        })
        .attr("height", function (d) {
          return height - y(d.frequency);
        })
        .attr("ry", "3")
        .style("fill", () => {
          let color =
            "#" +
            Math.floor((Math.random() * Math.pow(2, 32)) ^ 0xffffff)
              .toString(16)
              .substr(-6);
          return color;
        });
      d3.select("input").on("change", change);

      var sortTimeout = setTimeout(function () {
        d3.select("input").property("checked", true).each(change);
      }, 2000);

      function change() {
        clearTimeout(sortTimeout);

        // Copy-on-write since tweens are evaluated after a delay.
        var x0 = x
          .domain(
            val
              .sort(
                this.checked
                  ? function (a, b) {
                      return b.frequency - a.frequency;
                    }
                  : function (a, b) {
                      return d3.ascending(a.letter, b.letter);
                    }
              )
              .map(function (d) {
                return d.letter;
              })
          )
          .copy();

        svg.selectAll(".bar").sort(function (a, b) {
          return x0(a.letter) - x0(b.letter);
        });

        var transition = svg.transition().duration(750),
          delay = function (d, i) {
            return i * 50;
          };

        transition
          .selectAll(".bar")
          .delay(delay)
          .attr("x", function (d) {
            return x0(d.letter);
          });

        transition.select(".x.axis").call(xAxis).selectAll("g").delay(delay);
      }
    }
    // setTimeout(() => {
    //   change();
    // }, 5000);
  }, [val]);

  return (
    <div className="flex">
      <div className={chartId}>SortableBarChart</div>
    </div>
  );
};

SortableBarChart.propTypes = {};

export default SortableBarChart;
