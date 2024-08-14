import React, { useState } from "react";

import "./FloorPlan.css";

import { floorPlanData } from "../data";
import DUCToDUC from '../assets/DUCToDUC.png'
import DUCToGate from '../assets/DUCToGate.png'
import DUCToWC from '../assets/DUCToWC.png'
import DUCToPhysics from '../assets/DUCToPhysics.png'

import GateToDUC from '../assets/GateToDUC.png'
import GateToGate from '../assets/GateToGate.png'
import GateToWC from '../assets/GateToWC.png'
import GateToPhysics from '../assets/GateToPhysics.png'

import WCToDUC from '../assets/WCToDUC.png'
import WCToGate from '../assets/WCToGate.png'
import WCToWC from '../assets/WCToWC.png'
import WCToPhysics from '../assets/WCToPhysics.png'


import PhysicsToPhysics from '../assets/PhysicsToPhysics.png'
import PhysicsToDUC from '../assets/PhysicsToDUC.png'
import PhysicsToWC from '../assets/PhysicsToWC.png'
import PhysicsToGate from '../assets/PhysicsToGate.png'


const imageMap = {
    DUCToDUC : DUCToDUC,
    DUCToPhysics:DUCToPhysics,
    DUCToGate : DUCToGate,
    GateToPhysics:GateToPhysics,
    WCToPhysics:WCToPhysics,
    DUCToWC : DUCToWC,
    GateToDUC : GateToDUC,
    GateToGate: GateToGate,
    GateToWC: GateToWC,
    WCToDUC: WCToDUC,
    WCToGate: WCToGate,
    WCToWC: WCToWC,
    PhysicsToPhysics: PhysicsToPhysics,
    PhysicsToDUC:PhysicsToDUC,
    PhysicsToWC:PhysicsToWC,
    PhysicsToGate:PhysicsToGate
};

const FloorPlan = ({ qrData, setOpenQr }) => {

  console.log(qrData);
  const [sourceId, sourceName, imgUrl] = qrData.split("|");
  const [fromLocation, setFromLocation] = useState(sourceId);
  const [toLocation, setToLocation] = useState("");
  const [floorPlanImage, setFloorPlanImage] = useState(imageMap[imgUrl]);

  const handleFromLocationChange = (e) => {
    setFromLocation(e.target.value);
  };

  const handleToLocationChange = (e) => {
    setToLocation(e.target.value);
  };

  const handleSubmit = () => {
    const matchingFloorPlan = floorPlanData.find(
      (item) => item.sourceId === fromLocation && item.destId === toLocation
    );
    if (matchingFloorPlan) {
      setFloorPlanImage(imageMap[matchingFloorPlan.imageUrl]);
    } else {
      // Handle case when no matching floor plan is found
      setFloorPlanImage(imgUrl); // Reset to default image
    }
  };

  return (
    <div className="floor-plan-container">
      <h1 className="floor-plan-heading">Welcome to IIT Ropar. You are currently at {sourceName}</h1>
      <img src={floorPlanImage} alt="Floor Plan" className="floor-plan-image" />

      <div className="select-container">
        <select value={fromLocation} onChange={handleFromLocationChange}>
          <option value={sourceId}>{sourceName}</option>
        </select>
        <select value={toLocation} onChange={handleToLocationChange}>
          <option value="">Select To Location</option>
          <option value="1">DUC</option>
          <option value="2">Gate (Library Side)</option>
          <option value="3">Washroom</option>
          <option value="4">Physics Lab</option>

        </select>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick = {() => setOpenQr(false)}>Back to Home Page</button>
    </div>
  );
};

export default FloorPlan;