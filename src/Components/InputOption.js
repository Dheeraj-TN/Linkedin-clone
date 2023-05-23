import React, { useState } from "react";
import "./InputOption.css";
import { useStateValue } from "../StateProvider";
function InputOption({ Icon, Title, color }) {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="inputOptions">
      {Icon && <Icon style={{ color: color }} />}
      <p>{Title}</p>
    </div>
  );
}
export default InputOption;
