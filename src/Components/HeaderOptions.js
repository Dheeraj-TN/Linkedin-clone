import React, { useState, useEffect } from "react";
import "./HeaderOptions.css";
import { Avatar } from "@mui/material";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function HeaderOptions({ logout, avatar, Icon, title }) {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const logoutUser = () => {
    if (logout) {
      toast.warning("Logged Out!!", {
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: false,
      });
      signout();
    }
  };
  const [pic, setPic] = useState(null);
  const dpRef = collection(db, "UserDetails");
  useEffect(() => {
    const q = query(dpRef);
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().usermail === user?.email) {
          setPic(doc.data().photoURL);
        }
      });
    });
    //eslint-disable-next-line
  }, []);
  const signout = () => {
    auth.signOut().then(() => {
      // alert("Logged out");
      navigate("/login");
    });
  };

  return (
    <div className="headerOptions" onClick={logoutUser}>
      {Icon && <Icon className="header__icons" />}
      {avatar && (
        <Avatar className="header__icons" src={pic} alt={user?.email[0]} />
      )}
      <h3 className="title">{title}</h3>
      <ToastContainer />
    </div>
  );
}

export default HeaderOptions;
