import React, { useState } from "react";
import "./App.css";
import "./home.css"
import QrReader from "./components/QrReader";
import iitImg from './assets/iit.png'

function App() {
  const [openQr, setOpenQr] = useState(false);
  return (
    <div className="container">
      {!openQr && (
        <>
          <h2 className="heading">Welcome to Indian Institute of Technology, Ropar</h2>
          <img src={iitImg} style={{ height:"150px", marginBottom : "5px" , marginTop : "5px" }}></img>
          <h2 className="heading-2">Campus Navigation Application</h2>
          <h4 className="heading">Click to button below to scan QR code</h4>
          <button className="button" onClick={() => setOpenQr(!openQr)}>
            {openQr ? "Close" : "Open"} QR Scanner
          </button>
        </>
      )}
      {openQr && <QrReader setOpenQr = {setOpenQr}/>}
    </div>
  );
}

export default App;
