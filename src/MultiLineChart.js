import React, { useState, useEffect } from "react";

import { axisBottom, axisRight } from 'd3-axis';
import * as d3 from 'd3';

import Axis from './d3/Axis.jsx'
import ReactTransitionGroup from 'react-addons-transition-group'
import jsonData from './data/chart_tracks_color/1977.json';

function MultiLineChart(props) {

  const [data, setData] = useState(jsonData)
  const [headerText, setHeaderText] = useState(props.headerText)
  const [subHeaderText, setSubHeaderText] = useState(props.subHeaderText)
  const [innerWidth, setInnerWidth] = useState(props.width - props.margin.left - props.margin.right)
  const [innerHeight, setInnerHeight] = useState(props.height - props.margin.top - props.margin.bottom)
  const [xMin, setXMin] = useState(props.xMin)
  const [xMax, setXMax] = useState(props.xMax)
  const [dataUrl, setDataUrl] = useState(props.dataUrl)
  // const [clickedItemID, setClickedItemID] = useState(null)
  const [highlightedItemID, setHighlightedItemID] = useState(null)
  const [highlightedItemTrack, setHighlightedItemTrack] = useState(null)
  const [highlightedItemArtist, setHighlightedItemArtist] = useState(null)
  const [highlightedItemPeak, setHighlightedItemPeak] = useState(null)
  const [currentItemID, setCurrentItemID] = useState(null)
  const [highlightedTrajectory, setHighlightedTrajectory] = useState([])
  const [yMin, setYMin] = useState(props.yMin)
  const [yMax, setYMax] = useState(props.yMax)

  const xScale = d3.scaleTime().domain(
      [xMin, xMax]
    ).range(
      [0, innerWidth]
    )
  
  const yScale = d3.scaleLinear().domain(
    [yMin, yMax]
  ).range(
    [0, innerHeight]
  )

  useEffect(() => {
    return () => {
      console.log('MultiLineChart is mounted here')
    };
  }, []); // The empty dependency array means this effect will only run once, similar to componentDidMount

  const xZoom = function(){
    const zoomFactor = .1
  
    return Math.round(innerWidth * zoomFactor / 2)
  }

  const yZoom = function(){
    const zoomFactor = .1

    return Math.round(innerHeight * zoomFactor / 2)
  }

  const crudeZoomIn = function(event) {
    event.stopPropagation()

    let newXMin = xZoom()
    let newXMax = innerWidth - xZoom()
    let newYMin = yZoom()
    let newYMax = innerHeight - yZoom()
    
    setXMin(xScale.invert(newXMin))
    setXMax(xScale.invert(newXMax))
    setYMin(yScale.invert(newYMin))
    setYMax(yScale.invert(newYMax))
  }

  const crudeZoomOut = function(event) {
    event.stopPropagation()

    let newXMin = xScale(xMin) - xZoom()
    let newXMax = xScale(xMax) + xZoom()

    let newYMin = yScale(yMin) - yZoom()
    let newYMax = yScale(yMax) + yZoom()

    setXMin(xScale.invert(newXMin))
    setXMax(xScale.invert(newXMax))
    setYMin(yScale.invert(newYMin))
    setYMax(yScale.invert(newYMax))
  }

  const crudePanLeft = function(event) {
    event.stopPropagation()

    pan(panAmount('left'))
  }

  const crudePanRight = function(event) {
    event.stopPropagation()

    pan(panAmount('right'))
  }

  const panAmount = function(direction){
    const panFactor = .1

    switch (direction) {
      case 'left':
        // return Math.max(-innerWidth * panFactor, xScale(xMin))
        return -innerWidth * panFactor
      case 'right':
        return innerWidth * panFactor
      case 'up':
        return -innerHeight * panFactor
      case 'down':
        return innerHeight * panFactor
      default:
        return 0
    }
  }

  const crudePanUp = function(event) {
    event.stopPropagation()

    tilt(panAmount('up'))
  }

  const crudePanDown = function(event) {
    event.stopPropagation()

    tilt(panAmount('down'))
  }

  const pan = function(panAmount) {
    if(!panAmount) { return }

    setXMin(xScale.invert(xScale(xMin) + panAmount))
    setXMax(xScale.invert(xScale(xMax) + panAmount))
  }

  const tilt = function(tiltAmount) {
    if(!tiltAmount) { return }
    setYMin(yScale.invert(yScale(yMin) + tiltAmount))
    setYMax(yScale.invert(yScale(yMax) + tiltAmount))
  }

  const lineGenerator = d3.line()
    .x((d) => { return xScale(Date.parse(d.x)) })
    .y((d) => { return yScale(d.y || 0) })

  const handleMouseOver = function(d)
  {
    setHighlightedItemTrack(d.target.dataset.trackName)
    setHighlightedItemArtist(d.target.dataset.artistName)
    setHighlightedItemPeak(d.target.dataset.trackPeakPosition)
    
    setHighlightedTrajectory(d.target.dataset.line)
  }

  const handleMouseOut = function(d)
  {
    // d.target.classList.remove('highlight')
    // d.target.classList.add('transitional')
  }

  const handleClick = function(d)
  {
    setSubHeaderText(d.target.dataset.artistName)
    setHeaderText(d.target.dataset.trackName)
    setCurrentItemID(d.target.dataset.trackId)
  }

  return (
    <div className="">
      <div id="info">
        <p>hello this is the info: { highlightedItemID }</p>
        <p>Track Name: {highlightedItemTrack}</p>
        <p>Artist: {highlightedItemArtist}</p>
        <p>Peak Position: {highlightedItemPeak}</p>
        <p>More Info:</p>
      </div>
      { /* TODO: eventually this should be controlled by natural zooming actions (scrolling, selecting or gestures) */ }
      <button onClick={crudeZoomIn}>Zoom In</button>
      <button onClick={crudeZoomOut}>Zoom Out</button>
      <button onClick={crudePanLeft}>Pan Left</button>
      <button onClick={crudePanRight}>Pan Right</button>
      <button onClick={crudePanUp}>Pan Up</button>
      <button onClick={crudePanDown}>Pan Down</button>
      <br />
      <div
        onClick = {() => {
          // setClickedItemID(null)
          setHighlightedItemID(null)
        }}
      >
        <h3>{headerText}</h3>
        <p>{subHeaderText}</p>
        <svg width = {props.width} height = {props.height} className = "multi-line-chart">
          <g
            // transform = {`translate(${props.margin.left},${props.margin.top})`}
            width = {innerWidth}
            height = {innerHeight}
          >
            {/* { console.log(thing) } */}
            <svg width={innerWidth} height={innerHeight}>
              <ReactTransitionGroup component="g" className="view">
                {
                  data.map((track) => {
                    return track.trajectories.map((trajectory, i) => {
                      return (
                        <path
                          key = {track.id + '_' + i}
                          data-track-id = {track.id}
                          data-track-name = {track.name}
                          data-artist-name = {track.billboard_artist.name}
                          data-track-peak-position = {track.peak}
                          data-line = {lineGenerator(trajectory)}
                          d = { lineGenerator(trajectory) }
                          fill = { "none" }
                          onMouseOver = {handleMouseOver}
                          onMouseOut = {handleMouseOut}
                          onClick = {handleClick}
                          stroke = { '#' + track.color}
                          stroke-linejoin = {'round'}
                          className = { currentItemID == track.id ? 'current' : ''}
                        />
                      )
                    })
                  })
                }
                <path 
                  id='highlighted'
                  d = { highlightedTrajectory }
                  fill = { "none" }
                />
              </ReactTransitionGroup>
            </svg>
          </g>
            <Axis
              axisType = {'x'}
              scale = {xScale}
              axis = {d3.axisBottom}
              ticks = {props.xTicks}
              tickFormat = {d3.timeFormat("%b")}
              width = {innerWidth}
              key = {xMin + '_' + xMax} // change the key every time xMax or xMin changes, to force the component to re-render
              height = {innerHeight}
              labelText = {'xAxisLabelText'}
              labelOffset = {0}
            />
            <Axis
              axisType = {'y'}
              scale = {yScale}
              axis = {d3.axisRight}
              ticks = {props.yTicks}
              width = {innerWidth}
              key = {yMin + '_' + yMax} // change the key every time yMax or yMin changes, to force the component to re-render
              height = {innerHeight}
              labelText = {props.yAxisLabelText}
              labelOffset = {0}
            />
        </svg>
      </div>
    </div>
  );
}

export { MultiLineChart };
