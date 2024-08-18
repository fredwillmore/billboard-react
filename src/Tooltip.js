import React, { useState } from 'react';
import './Tooltip.css'; // Styles for the tooltip

function Tooltip({ props, children }) {
  // const [showTooltip, setShowTooltip] = useState(false);

  // const handleMouseEnter = () => {
  //   setShowTooltip(true);
  // };

  // const handleMouseLeave = () => {
  //   setShowTooltip(false);
  // };
  return (
    <div className="tooltip-container"
      style={{
        // position: 'absolute',
        left: '100px',
        top: '100px'
      }}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
    >
      {/* {props.showTooltip && <div className="tooltip">
        {children}
        {props.text}
      </div>} */}
    </div>
  );
};

export default Tooltip;
