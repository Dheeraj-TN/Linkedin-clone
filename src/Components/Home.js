import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { useStateValue } from "../StateProvider";
import Login from "../LoginPages/Login";
import Widgets from "./Widgets";
import { BarLoader } from "react-spinners";
function Home() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="home">
      {loading ? (
        <div className="loader">
          <img src="/images/Linkedin-Logo.png" alt="" />
          <BarLoader
            color={"#0a66c2"}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : !user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widgets />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
