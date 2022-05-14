import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
const DonutChart = (props) => {
  useEffect(() => {
    var data = [
      { fruit: "Apples", count: 5332 },
      { fruit: "Apples", count: 332 },
      { fruit: "Bananas", count: 3111 },
      { fruit: "Bananas", count: 5332 },
    ];
    var width = 360,
      height = 200,
      radius = Math.min(width, height) / 2;

    var color = ["#f3f311", "#f4a911"];

    var pie = d3
      .pie()
      .value(function (d) {
        return d.count;
      })
      .sort(null);

    var arc = d3
      .arc()
      .innerRadius(radius - 40)
      .outerRadius(radius - 20);

    var svg = d3
      .select(".donut-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var path = svg.selectAll("path");

    var label = d3
      .select("form")
      .selectAll("label")
      .data(data)
      .enter()
      .append("label");

    label
      .append("input")
      .attr("type", "radio")
      .attr("name", "fruit")
      .attr("value", function (d) {
        return d.key;
      })
      .on("change", change)
      .filter(function (d, i) {
        return !i;
      })
      .each(change)
      .property("checked", true);

    label.append("span").text(function (d) {
      return d.key;
    });

    function change(region) {
      var data0 = path.data(),
        data1 = pie(region.values);

      path = path.data(data1, key);

      path
        .enter()
        .append("path")
        .each(function (d, i) {
          this._current = findNeighborArc(i, data0, data1, key) || d;
        })
        .attr("fill", function (d, i) {
          return color[i];
        });

      path
        .exit()
        .datum(function (d, i) {
          return findNeighborArc(i, data1, data0, key) || d;
        })
        .transition()
        .duration(750)
        .attrTween("d", arcTween)
        .remove();

      path.transition().duration(750).attrTween("d", arcTween);
    }

    function key(d) {
      return d.data.region;
    }

    function type(d) {
      d.count = +d.count;
      return d;
    }

    function findNeighborArc(i, data0, data1, key) {
      var d;
      return (d = findPreceding(i, data0, data1, key))
        ? { startAngle: d.endAngle, endAngle: d.endAngle }
        : (d = findFollowing(i, data0, data1, key))
        ? { startAngle: d.startAngle, endAngle: d.startAngle }
        : null;
    }

    // Find the element in data0 that joins the highest preceding element in data1.
    function findPreceding(i, data0, data1, key) {
      var m = data0.length;
      while (--i >= 0) {
        var k = key(data1[i]);
        for (var j = 0; j < m; ++j) {
          if (key(data0[j]) === k) return data0[j];
        }
      }
    }

    // Find the element in data0 that joins the lowest following element in data1.
    function findFollowing(i, data0, data1, key) {
      var n = data1.length,
        m = data0.length;
      while (++i < n) {
        var k = key(data1[i]);
        for (var j = 0; j < m; ++j) {
          if (key(data0[j]) === k) return data0[j];
        }
      }
    }

    function arcTween(d, index) {
      var i = d3.interpolate(this._current, d);
      if (index === 1) console.log(this._current, i(0));
      this._current = i(0);
      return function (t) {
        return arc(i(t), index);
      };
    }
  }, []);
  return <div className="donut-chart">1</div>;
};

DonutChart.propTypes = {};

export default DonutChart;
