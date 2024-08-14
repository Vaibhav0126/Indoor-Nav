import React, { useEffect, useRef, useState } from "react";
import FloorPlan from "./FloorPlan";

import "./QrStyles.css";
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";

const QrReader = ({setOpenQr}) => {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    const onScanSuccess = (result) => {
      console.log(result);
      if (result?.data) {
        setScannedData(result.data); // Save the scanned data
      }
    };

    const onScanFail = (err) => {
      console.log(err);
    };

    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <>
        {!scannedData && 
        <div className="qr-reader">
            <video ref={videoEl}></video>
            <div ref={qrBoxEl} className="qr-box">
                <img
                src={QrFrame}
                alt="Qr Frame"
                width={256}
                height={256}
                className="qr-frame"
                />
            </div>
        </div>}
        {scannedData && <FloorPlan qrData={scannedData} setOpenQr={setOpenQr}/>}
    </>
  );
};

export default QrReader;
