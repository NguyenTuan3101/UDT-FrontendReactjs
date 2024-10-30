import React, { useState, useEffect } from "react";

interface DisplayProps {
  displayValue: string;
  onValueChange: (value: string) => void; // New prop for value change
}

const Display = React.forwardRef<HTMLDivElement, DisplayProps>(
  ({ displayValue, onValueChange }, ref) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(displayValue); // State for the input value

    useEffect(() => {
      setInputValue(displayValue); // Update inputValue when displayValue changes
    }, [displayValue]);

    const handleBlur = () => {
      setIsEditing(false); // Exit edit mode
      onValueChange(inputValue); // Notify parent about the value change
    };

    return (
      <div className="display" ref={ref} onClick={() => setIsEditing(true)}>
        {isEditing ? (
          <input
            className="display-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          displayValue
        )}
      </div>
    );
  },
);

Display.displayName = "Display";

export default Display;
