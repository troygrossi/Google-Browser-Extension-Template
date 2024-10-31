


export const Modal = () => {
  
    return(
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1>Modal Window</h1>
          <p>HTML(entry) -- public/backgroundModal.html</p>
          <p>jsx/js -- src/backgroundModal/index.jsx</p>
          <p>connection: src/backgroundModal/index.jsx -- configuration/backgroundModal.js -(*build*)- dist/backgroundModal.html-dist/backgroundModal.js</p>
        </div>
      </div>
    )
}




    