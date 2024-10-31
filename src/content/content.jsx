export const Content = () => {
  const handleClick = () => {
    // Open a port to communicate with the background script
    const port = chrome.runtime.connect({ name: "content-script" });
    port.postMessage({ action: "openModal" });
  };
  console.log("HTML content injected");

  return (
    <div
      style={{
        position: "fixed",
        top: "50vh",
        left: "50vw",
        backgroundColor: "red",
        color: "white",
        display: "flex",
        flexDirection: 'column',
        alignItems: "flex-start",
        justifyContent: "center",
        transform: "translate(-50%, -50%)", // Center the box
        zIndex: 10000, // Ensure it’s on top of other elements
      }}
      onClick={handleClick}
    >
      <div>js(entry) -- configuration/content.js</div>
      <div>jsx/js -- src/content/index.jsx</div>
      <div>
        connection: src/content/index.jsx --
        configuration/content.js -(*build*)-
        dist/content.js
      </div>
      <h1>Click me to open background modal</h1>
    </div>
  );
};
