import React, { useState } from "react";
import Button from "./Button";
import InsertForm from "./InsertForm";
import VehicleList from "./VehicleList";
import "../style/VehicleStyle.css";
function Vehicle() {
  const [showList, setShowList] = useState(true);

  const toggleShowList = () => {
    setShowList(!showList);
  };

  return (
    <div>
      {showList ? (
        <div>
          <VehicleList />
        </div>
      ) : (
        <div>
          <InsertForm />
        </div>
      )}
      <Button
        name={showList ? "Add Vehicle" : "Show List"}
        onClick={toggleShowList}
      />
    </div>
  );
}

export default Vehicle;
