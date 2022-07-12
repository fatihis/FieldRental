import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import $ from "jquery";
import dummmy from "./dummy.json";
import "./index.css";
import { notification } from "antd";
import { AiOutlineConsoleSql } from "react-icons/ai";
const MapChart = (props) => {
  const divRef = useRef();

  useEffect(() => {
    $(".map-chart").empty();
    var width = window.innerWidth > 1900 ? 660 : 500,
      height = 450,
      focused = null,
      geoPath;
    var svg = d3
      .select(".map-chart")
      .append("svg")
      .attr("viewBox", "0 0 " + width + " 450")
      .attr("preserveAspectRatio", "xMinYMin meet");

    svg
      .append("rect")
      .attr("class", "background")
      .attr("viewBox", "0 0 " + width + " 450")
      .attr("preserveAspectRatio", "xMinYMin meet");

    var g = svg.append("g").append("g").attr("id", "states");
    svg.append("text").attr("x", 10).attr("y", 20).text("Aktive Arbeitskarte");

    var collection = dummmy;
    var bounds = d3.geoBounds(collection),
      bottomLeft = bounds[0],
      topRight = bounds[1],
      rotLong = -(topRight[0] + bottomLeft[0]) / 2,
      center = [
        (topRight[0] + bottomLeft[0]) / 2 + rotLong,
        (topRight[1] + bottomLeft[1]) / 2,
      ],
      //default scale projection
      projection = d3
        .geoAlbers()
        .parallels([bottomLeft[1], topRight[1]])
        .rotate([rotLong, 0, 0])
        .translate([width / 2, height / 2])
        .center(center),
      bottomLeftPx = projection(bottomLeft),
      topRightPx = projection(topRight),
      scaleFactor =
        1.0 *
        Math.min(
          width / (topRightPx[0] - bottomLeftPx[0]),
          height / (-topRightPx[1] + bottomLeftPx[1])
        ),
      projection = d3
        .geoAlbers()
        .parallels([bottomLeft[1], topRight[1]])
        .rotate([rotLong, 0, 0])
        .translate([width / 2, height / 2])
        .scale(scaleFactor * 0.975 * 1000)
        //.scale(4*1000)  //1000 is default for USA map
        .center(center);

    geoPath = d3.geoPath().projection(projection);

    var graticule = d3.geoGraticule().step([1, 1]);

    g.append("path")
      .datum(graticule)
      .attr("class", "graticuleLine")
      .attr("d", geoPath);
    var tooltip = d3.select(".tooltip-area").style("opacity", 0);

    svg.append("g").attr("class", "tooltip-area__text");
    const mouseover = (event, d) => {
      tooltip.style("opacity", 1);
    };

    const mouseleave = (event, d) => {
      // tooltip.style('opacity', 0);
    };

    const mousemove = (event, d) => {
      const text = d3.select(".tooltip-area__text");
      text.text(`Sales were joe`);
      const [x, y] = d3.pointer(event);

      tooltip.attr("transform", `translate(${x}, ${y})`);
    };
    var myColor = d3
      .scaleOrdinal()
      .domain(collection.features)
      .range(d3.schemeSet3);
    var features = g
      .selectAll("path.feature")
      .data(collection.features)
      .enter()
      .append("path")
      .attr("class", "feature")
      .attr("d", geoPath)
      .style("fill", function (d) {
        return myColor(d);
      })
      // .on("click", clickPath)
      .on("click", (_, d) => clickText(d))
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseout", mouseleave);

    function clickPath(d) {
      var x = width / 2,
        y = height / 2,
        k = 1,
        name = d.properties.NAME_1;

      g.selectAll("text").remove();
      if (focused === null || !(focused === d)) {
        var centroid = geoPath.centroid(d),
          x = +centroid[0],
          y = +centroid[1],
          k = 1.75;
        focused = d;

        g.append("text")
          .text(name)
          .attr("x", x)
          .attr("y", y)
          .style("text-anchor", "middle")
          .style("font-size", "8px")
          .style("stroke-width", "0px")
          .style("fill", "black")
          .style("font-family", "Times New Roman")
          .on("click", clickText);
      } else {
        focused = null;
      }

      g.selectAll("path").classed(
        "active",
        focused &&
          function (d) {
            return d === focused;
          }
      );

      g.transition()
        .duration(1000)
        .attr(
          "transform",
          "translate(" +
            width / 2 +
            "," +
            height / 2 +
            ")scale(" +
            k +
            ")translate(" +
            -x +
            "," +
            -y +
            ")"
        )
        .style("stroke-width", 1.75 / k + "px");
    }

    function clickText(d) {
      const args = {
        message: d.properties.NAME_1,
        description: "Aktive Arbeitskarte:" + Math.floor(Math.random() * 22),
        duration: 2,
      };
      notification.open(args);
      //   focused = null;
      //   g.selectAll("text").remove();
      //   g.selectAll("path").classed("active", 0);
      //   g.transition()
      //     .duration(1000)
      //     .attr("transform", "scale(" + 1 + ")translate(" + 0 + "," + 0 + ")")
      //     .style("stroke-width", 1.0 + "px");
    }
  }, []);
  return <div ref={divRef} className="map-chart"></div>;
};

MapChart.propTypes = {};

export default MapChart;
