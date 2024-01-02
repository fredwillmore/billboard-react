import ReactDOM from 'react-dom';

class Bar extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillEnter(callback) {
    this.triggerTransitions(callback)
  }

  componentDidUpdate() {
    this.triggerTransitions()
  }

  triggerTransitions(callback = () => {}) {
    var node = d3.select(ReactDOM.findDOMNode(this))

    var a0 = this.props.transitionAttributes[0],
      a1 = this.props.transitionAttributes[1]
    node.transition()
        .delay(a0.delay)
        .duration(a0.duration)
        .attr(isNaN(a0.x) ? null : 'x', a0.x)
        .attr(isNaN(a0.width) ? null : 'width', a0.width)
        .attr(isNaN(a0.y) ? null : 'y', a0.y)
        .attr(isNaN(a0.height) ? null : 'height', a0.height)
      .transition()
        .attr(isNaN(a1.x) ? null : 'x', a1.x)
        .attr(isNaN(a1.width) ? null : 'width', a1.width)
        .attr(isNaN(a1.y) ? null : 'y', a1.y)
        .attr(isNaN(a1.height) ? null : 'height', a1.height)
      .on('end', () => callback())
  }

  render() {
    return(
      <rect
        x = {this.props.x}
        y = {this.props.y}
        width = {this.props.width}
        height = {this.props.height}
        label = {this.props.label}
        fill = {this.props.fill}
      />
    )
  }
}

export default Bar
