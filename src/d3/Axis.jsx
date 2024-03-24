// import VisualizationsHelpers from '../visualization_helpers.js'
// const vh = new VisualizationsHelpers
import React, { useState, useEffect, useRef } from "react";
import * as d3 from 'd3';

function Axis(props) {
  const axisRef = useRef();
  useEffect(() => {
    const axis = props.axis(props.scale);

    if (props.tickFormat) axis.tickFormat(props.tickFormat);
    if (props.tickValues) axis.tickValues(props.tickValues);
    if (props.tickSize) axis.tickSize(props.tickSize);
    if (props.tickPadding) axis.props.tickPadding(props.tickPadding);

    d3.select(axisRef.current).call(axis);

    // Optionally add a label
    if (props.label) {
      d3.select(axisRef.current)
        .append('text')
        .attr('class', 'axis-label')
        .attr('transform', `rotate(-90)`)
        .attr('y', props.labelOffset || 0)
        .attr('dy', '0.71em')
        .style('text-anchor', 'end')
        .text(props.label);
    }
  }, []);

  // useEffect(() => {
  //   renderAxis();
  // }, []); 
  // ugh - just look at this thing - just look at it!
  const wrap = function(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }

  // const renderAxis = function() {
  //   // var node  = this.refs.axis
  //   var node  = null
  //   var axis = props.axis(props.scale)

  //   // TODO: I'd like to just use d3.format as the default string formatting function
  //   // however, this doesn't seem to play nice with axes with log scale for ticks(>5.7182716096)
  //   // I don't know if this number is significant outside of the data set I'm trying to work with
  //   // I find issues with log representation of my bar chart
  //   // f = typeof(this.props.tickFormat) == 'function' ? this.props.tickFormat : d3.format(this.props.tickFormat)
  //   // axis.tickFormat(f).ticks(5.7182716096)
  //   if(typeof(props.tickFormat) == 'function'){
  //     axis.tickFormat(props.tickFormat).ticks(props.ticks)
  //   } else {
  //     axis.ticks(props.ticks, props.tickFormat)
  //   }
  //   var s = d3.select(node)
  //     .call(axis)

  //   if(props.wrapWidth){
  //     s.selectAll(".tick text").call(wrap, props.wrapWidth)
  //   }
  // }

  const isX = function() {
    return props.axisType == 'x'
  }

  const isY = function() {
    return props.axisType == 'y'
  }

  const textTransform = function() {
    let value = isX() ? `translate(${props.width/2}, ${props.height + props.labelOffset})` : `translate(-${props.labelOffset}, ${props.height/2}) rotate(-90)`
    return value
  }

  const axisTransform = function() {
    return isX() ? `translate(0, ${props.height})` : ''
  }

  // console.log("hello from axis")
  return (
    <g
      ref = {axisRef}
      transform = {axisTransform()}
    >
      {/* <g
        className = {props.className}
        // ref="axis"
        transform = {axisTransform()}
        width = {props.width}
      >
      </g>
      <text
        className = "label"
        textAnchor = 'middle'
        transform = {textTransform()}
      >
        {props.labelText}
      </text> */}
    </g>
  )
}

// export { Axis }; 
export default Axis
// TODO: the whole switch-on-type things happening to differentiate x and y axes is a code smell that indicates a need for dependency injection
// I don't think this is the right way to do it, but I'll just leave it here until it starts to smell bad

// class XAxis extends React.Component {
//   constructor (props) {
//     super(props)
//   }
//
//   render() {
//     return (
//       <Axis
//         axisType = 'x'
//         className = {this.props.className}
//         scale = {this.props.scale}
//         axis = {this.props.axis}
//         tickFormat = {this.props.tickFormat}
//         labelText = {this.props.labelText}
//         labelOffset = {this.props.labelOffset}
//         width = {this.props.width}
//         height = {this.props.height}
//       >
//       </Axis>
//     )
//   }
// }
//
// XAxis.defaultProps = {
//   className: "x axis",
//   tickFormat: (t) => t.toString(),
//   axis: ''
// }
