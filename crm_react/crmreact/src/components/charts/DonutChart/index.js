import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import $ from "jquery";
import "./index.css";
const DonutChart = ({ value, chartTitle, chartId, barColor }) => {
  const divRef = useRef();
  var width = 270;
  var height = 180;

  useEffect(() => {
    $("." + chartId).empty();
    var svg = d3
      .select("." + chartId)
      .append("svg")
      .attr("viewBox", "0 0 270 180")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g");

    // svg.append("text").attr("x", -10).attr("y", -30).text(chartTitle);

    var valueText = svg
      .append("text")
      .attr("x", -10)
      .text(value + "%");

    svg.append("g").attr("class", "slices");
    svg.append("g").attr("class", "labels");
    svg.append("g").attr("class", "lines");
    svg.append("g").attr("class", "texts");

    var radius = Math.min(width, height) / 2;
    var color = d3
      .scaleOrdinal()
      .range(["#EFEFF9", (barColor = !"" ? barColor : "#4C62F5")]);
    var data = [100 - value, value];

    var pie = d3
      .pie()
      .sort(null)
      .value((d) => d);
    var arc = d3
      .arc()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 0.6);

    var outerArc = d3
      .arc()
      .outerRadius(radius * 0.9)
      .innerRadius(radius * 0.9);

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));
    svg.append("g").classed("labels", true);
    svg.append("g").classed("lines", true);

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
  }, []);

  return (
    <div className="donut-container">
      <h5 className=" text-lg">{chartTitle}</h5>
      <div className={chartId} ref={divRef}></div>
    </div>
  );
};

DonutChart.propTypes = {};

export default DonutChart;
