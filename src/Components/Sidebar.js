import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useStateValue } from "../StateProvider";
import { db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { Link } from "react-router-dom";
function Sidebar() {
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
  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const imageRef = ref(storage, user?.uid + ".png");
    uploadBytes(imageRef, image)
      .then(() => {
        setLoading(true);
        getDownloadURL(imageRef)
          .then((url) => {
            setPic(url);
            addDoc(dpRef, {
              usermail: user?.email,
              photoURL: url,
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
        console.log(pic);
        sessionStorage.setItem("picture", pic);
        setImage(null);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    const q = query(dpRef);
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().usermail === currentUser) {
          setPic(doc.data().photoURL);
          setBg(doc.data().bgImage);
          sessionStorage.setItem("profilePic", pic);
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
  console.log("Bg in sidebar : " + bg);
  console.log("username : " + name);
  const recentItems = (topic) => {
    return (
      <div
        className="sidebar__recentItem"
        style={{ display: "flex", marginBottom: "5px" }}
      >
        <span className="sidebar__hash">#</span>
        <p>{topic}</p>
      </div>
    );
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        {bg ? (
          <img src={bg} alt="" />
        ) : (
          <img
            src="https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=790&h=196&q=90&fm=png"
            alt=""
          />
        )}

        <Avatar src={pic} className="sidebar__avatar" />
        <Link to="/profile">
          <h2>{user.displayName || name}</h2>
        </Link>
        <p>{user.email}</p>
        <div className="addProfilePic">
          <button className="add__profile" disabled={!pic || loading}>
            <input type="file" onChange={handleChange} />
            <i className="fa-solid fa-upload"></i>Select your profile picture
            here
          </button>
          <h4 onClick={handleUpload}>Click here to upload </h4>
        </div>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed your profile</p>
          <p className="sidebar__statNum">23</p>
        </div>
        <div className="sidebar__stat">
          <p>Connections</p>
          <p className="sidebar__statNum">38</p>
        </div>
        <div className="items">
          <p className="items">
            <BookmarkIcon />
            My Items
          </p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <div className="sidebar__middle">
          <p>Groups</p>
          <div className="addEvents">
            <p>Events</p>
            <AddIcon />
          </div>

          <p>Followed hastags</p>
        </div>
        <div className="recents">
          <p className="recent">Recent</p>
          {recentItems("reactjs")}
          {recentItems("reactjs")}
          {recentItems("reactjs")}
          {recentItems("reactjs")}
        </div>
        <button className="showMore">Show More</button>
      </div>
    </div>
  );
}

export default Sidebar;
