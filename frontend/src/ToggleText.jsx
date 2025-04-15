import React, { useState } from "react";

const ToggleText = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleToggle = () => setIsVisible(prev => !prev);

  return (
    <div>
      <h2>Toggle Text</h2>

      <button onClick={handleToggle} aria-expanded={isVisible}>
        {isVisible ? "Hide Text" : "Show Text"}
      </button>{" "}
      {isVisible && <p>This text should appear or disappear</p>}
    </div>
  );
};

export default ToggleText;
