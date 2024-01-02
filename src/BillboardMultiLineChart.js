import React, { useState, useEffect } from "react";
import { MultiLineChart } from './MultiLineChart.js'

function BillboardMultiLineChart() {

  const [chartLength, setChartLength] = useState(40);
  const [year, setYear] = useState(1977);
  const [dataUrl, setDataUrl] = useState('');
  const [yMin, setYMin] = useState(0);
  const [yMax, setYMax] = useState(100);
  const [startDate, setStartDate] = useState('1977-01-01');
  const [endDate, setEndDate] = useState('1977-12-31');
  const [headerText, setHeaderText] = useState('Billboard Top 40 for 1977');
  const [subHeaderText, setSubheaderText] = useState('Default subheader text');
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(300);
  // const [xScale, setXScale] = useState('date');
  const [xTicks, setXTicks] = useState(12);
  // const [xTickFormat, setXTickFormat] = useState((d) => new Date(d).toLocaleDateString("en-US", { month: 'long', day: 'numeric' }));
  // const [yScale, setYScale] = useState('date');
  const [yTicks, setYTicks] = useState(100);
  const [yTickFormat, setYTickFormat] = useState((d) => (d == 1 || 0 == d%10) ? d : '');
  const [xAxisLabelText, setXAxisLabelText] = useState('Date')
  const [yAxisLabelText, setYAxisLabelText] = useState('Chart Position')
  const [data, setData] = useState([])

  useEffect(() => {
    return () => {
      console.log('it is mounted here')
    };
  }, []); // The empty dependency array means this effect will only run once, similar to componentDidMount

  const chartLengthOptions = function() {
    return [10, 40, 100].map((current) => (
      <option key={current} value={current}>Top {current}</option>
    ) )
  }

  const handleYearChange = function(year) {
    console.log(year)
    // import(`./data/${year}.json`)
    // import(`./data/1977.json`)
    //   // .then((module) => module.default) // Access the default export
    //   .then((data) => {
    //     console.log(year.target.value)
    //     setYear(year);
    //     setData(data);
    //   })

      resetChartParams()
  }

  const resetChartParams = function() {
    if(!chartLength) { setChartLength(40) }
    // if(!year) { setYear(1977) }
    setDataUrl(`/visualizations/billboard_multi_line_chart?chart_length=${chartLength}&year=${year}&use_flat_file=${true}`)

    setYMin(chartLength)
    setYMax(0)
    setStartDate(`${year}-01-01`)
    setEndDate(`${year}-12-31`)
    setHeaderText(`Billboard Top ${chartLength} for ${year}`)
    return
  }

  const yearOptions = function() {
    var years = []
    for(var i=1940; i<=2015; i++) { years.push(i) }
    return years.map((current) => (
      <option key={current} value={current}>{current}</option>
    ))
  }

  return (
    <div className="BillboardMultiLineChart">
      <select
        value = { chartLength }
        onChange = { resetChartParams }
      >
        {chartLengthOptions()}
      </select>
      <select
        value = { year }
        onChange={ handleYearChange }
      >
        {yearOptions()}
      </select>
      <MultiLineChart
        dataUrl = {dataUrl}
        headerText = {headerText}
        subHeaderText = {subHeaderText}
        xMin = {new Date(Date.parse(startDate))}
        xMax = {new Date(Date.parse(endDate))}
        yMin = {yMin}
        yMax = {yMax}
        width = {width}
        height = {height}
        // xScale = {xScale}
        // yScale = {yScale}
        xTicks = {xTicks}
        // xTickFormat = {xTickFormat}
        yTicks = {yTicks}
        yTickFormat = {yTickFormat}
        xAxisLabelText = {xAxisLabelText}
        yAxisLabelText = {yAxisLabelText}
        getHeaderText = {(d) => `${d.billboard_artist.name} - ${d.name}`}
        getSubheaderText = {(d) => `Entered the charts on ${new Date(Date.parse(d.entry_date)).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}. On the chart for a total of ${d.weeks} weeks. Peaked at number ${d.peak}.` }
        getCurrentItemID = {(d) => d.id}
        formatData = {(data) => {
          var formattedData = data.map((d) => {
            var val = {
              id: d.id,
              billboard_artist: d.billboard_artist,
              name: d.name,
              entry_date: d.entry_date,
              peak: d.peak,
              weeks: d.weeks,
              values: d.trajectories.map((trajectory) => {
                return trajectory.map((entry) => {
                  return {x: new Date(Date.parse(entry.x)), y: entry.y}
                })
              })
            }
            return val
          })
          return formattedData
        }}
        getHighlightedItemID = {(d) => d.billboard_artist.id}
        getClickedItemID = {(d) => d.id}
        margin = {{top: 30, right: 30, bottom: 30, left: 40}}
        data = {data}
      />
    </div>
  );
}

export { BillboardMultiLineChart };
