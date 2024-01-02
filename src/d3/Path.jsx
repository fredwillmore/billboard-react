import React, { useState, useEffect } from "react";
import * as d3 from 'd3';

function Path(props) {
  const [className, setClassName] = useState(props.className)
  const [strokeColor, setStrokeColor] = useState(props.strokeColor)

  useEffect(() => {
  }, []); 

  // constructor  {
  //   super(props)
  //   this.handleMouseOver = this.handleMouseOver.bind(this)
  //   this.handleMouseOut = this.handleMouseOut.bind(this)
  //   this.handleClick = this.handleClick.bind(this)
  //   this.state = {
  //     className: this.props.className,
  //     strokeColor: this.props.strokeColor
  //   }
  // }


  // componentWillReceiveProps(nextProps) {
  //   this.setState({className: nextProps.className})
  // }

  const handleMouseOver = function() {
    props.onMouseOverCallback()
  }

  const handleMouseOut = function() {
    props.onMouseOutCallback()
  }

  const handleClick = function(event) {
    props.onClickCallback(event)
  }

  return (
    <path
      data = {props.data}
      className = {className}
      d = {props.d}
      onMouseOver = {handleMouseOver}
      onMouseOut = {handleMouseOut}
      onClick = {handleClick}
      stroke = {strokeColor}
    />
  )
}

// Path.defaultProps = {

// }

export default Path