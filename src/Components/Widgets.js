import React from "react";
import "./Widgets.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Sidebar from "./Sidebar";
function Widgets() {
  const news = (title, desc) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widgets__articleRight">
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </div>
  );
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {news("Green energy gets funding boost", "22h ago · 286 readers")}
      {news("SAP to hire 1000 people", "22h ago · 9538 readers")}
      {news("The rise of returning emoplyees", "22h ago · 2986 readers")}
      {news("IT has attririon", "22h ago · 2704 readers")}
      <hr />
      <div className="widgets__footer">
        <div className="footer__up">
          <p>About</p>
          <p>Accesibility</p>
          <p>Help Center</p>
        </div>
        <div className="footer__middle">
          <p>Privacy Terms</p>
          <p>Ad Choices</p>
          <p>Business Services</p>
        </div>
        <div className="footer__bottom">
          <p>Advertising</p>
          <p>More</p>
          <p>Get Linkedin App</p>
        </div>
      </div>
      <div className="copyRights">
        <img src="/images/Linkedin-Logo.png" alt="" />
        <p> LinkedIn-clone Corporation © 2023</p>
      </div>
    </div>
  );
}

export default Widgets;
