import React from "react";

interface DisplayProps {
  displayValue: string;
  onClick: () => void;
}

const Display = React.forwardRef<HTMLDivElement, DisplayProps>(
  ({ displayValue, onClick }, ref) => (
    <div className="display" onClick={onClick} ref={ref}>
      {displayValue}
    </div>
  ),
);

Display.displayName = "Display";

export default Display;
