import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import { Link } from "react-router-dom";
import { db, storage } from "../firebase";
import Avatar from "@mui/material/Avatar";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import "./SearchDisplay.css";
function SearchDisplay({ userPic, userName, email }) {
  const [{ user }, dispatch] = useStateValue();
  const currentUser = user?.email;
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState(null);
  const [bg, setBg] = useState(null);
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const dpRef = collection(db, "UserDetails");
  const userAuthRef = collection(db, "userAuth");
  useEffect(() => {
    const q = query(dpRef);
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().usermail === currentUser) {
          setPic(doc.data().photoURL);
          setBg(doc.data().bgImage);
        }
      });
    });
    const q2 = query(userAuthRef);
    onSnapshot(q2, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        if (doc.data().mail === currentUser) {
          items.push(doc.data().username);
        }
      });
      setName(items);
    });
    //eslint-disable-next-line
  }, []);
  return (
    <div className="search__display" style={{ marginTop: "30px" }}>
      <div className="search__top">
        {bg ? (
          <img src={bg} alt="" />
        ) : (
          <img
            src="https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=790&h=196&q=90&fm=png"
            alt=""
            style={{ marginBottom: "-30px" }}
          />
        )}

        <Avatar
          src={userPic}
          className="sidebar__avatar"
          style={{ marginLeft: "20px" }}
          sx={{ width: 100, height: 100 }}
        />

        <h2 style={{ marginLeft: "20px" }}>{userName}</h2>
        <p style={{ marginLeft: "20px" }}>{email}</p>
      </div>
    </div>
  );
}

export default SearchDisplay;
