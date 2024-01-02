import React, { useState, useEffect } from "react";
import * as d3 from 'd3';
import Path from './Path.jsx'
import ReactDOM from 'react-dom'

function Line(props) {

  useEffect(() => {
    console.log('useEffect')
    // triggerTransitions()
  }, []); 

  // const triggerTransitions = function() {
  //   // TODO: do I need ReactDOM or is there another way to do this
  //   var node = d3.select(ReactDOM.findDOMNode(this))
  //   node.transition()
  //       .duration(500)
  //       .attr('d', props.d)
  // }

  return (
    <path
      key = {props.key}
      data = {props.data}
      // data-track-id = {track.id}
      // data-track-name = {track.name}
      // data-artist-name = {track.billboard_artist.name}
      // data-track-peak-position = {track.peak}
      d = { props.d }
      fill = { "none" }
      onMouseOver = {props.handleMouseOver}
      onMouseOut = {props.handleMouseOut}
      onClick = {props.handleClick}
      stroke = { props.stroke}
      className = { props.className}
    />
    // <Path
    //   data = {props.data}
    //   className = {props.className}
    //   relatedClassName = {props.relatedClassName}
    //   mouseOverClassName = {props.mouseOverClassName}
    //   clickedClassName = {props.clickedClassName}
    //   onMouseOverCallback = {props.onMouseOverCallback}
    //   onMouseOutCallback = {props.onMouseOutCallback}
    //   onClickCallback = {props.onClickCallback}
    //   strokeColor = {props.stroke}
    // />
  )
}

export default Line