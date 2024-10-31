
    

export const Popup = () => {
  

    return(
        <>
        <h1>Chrome Extension Running</h1>
        <p>HTML(entry) -- public/popup.html</p>
        <p>jsx/js -- src/popup/index.jsx</p>
        <p>
          connection: src/popup/index.jsx --
          configuration/popup.js -(*build*)-
          dist/popup.html-dist/popup.js
        </p>
        </>
    )
}