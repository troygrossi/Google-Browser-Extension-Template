import { useEffect, useState } from "react";

export const Options = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  // Load the saved setting from chrome.storage
  useEffect(() => {
    chrome.storage.sync.get(["featureEnabled"], (result) => {
      setIsEnabled(result.featureEnabled || false); // default to false if not set
    });
  }, []);

  // Handle toggle change
  const handleToggle = (event) => {
    const newValue = event.target.checked;
    setIsEnabled(newValue);

    // Save the new setting to chrome.storage
    chrome.storage.sync.set({ featureEnabled: newValue }, () => {
      console.log(`Feature enabled setting saved: ${newValue}`);
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Extension Options</h1>
      <label>
        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
        Enable Feature
      </label>
      <p>HTML(entry) -- public/options.html</p>
      <p>jsx/js -- src/options/index.jsx</p>
      <p>
        connection: src/options/index.jsx --
        configuration/options.js -(*build*)-
        dist/options.html-dist/options.js
      </p>
    </div>
  );
};

export default Options;
