import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useStateValue } from "../StateProvider";
import CreateIcon from "@mui/icons-material/Create";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Avatar from "@mui/material/Avatar";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import Header from "./Header";
import Widgets from "./Widgets";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Button } from "@mui/material";
function Profile() {
  const [{ user }, dispatch] = useStateValue();
  const [pic, setPic] = useState(null);
  const [name, setName] = useState("");
  const [background, setBackground] = useState(null);
  const [bg, setBG] = useState(null);
  const [posts, setPosts] = useState([]);
  // const [profilePic, setProfilePic] = useState(null);
  const [about, setAbout] = useState(false);
  const dpRef = collection(db, "UserDetails");
  const nameRef = collection(db, "userAuth");
  const postRef = collection(db, "Post");
  const handlChange2 = (e) => {
    setBackground(e.target.files[0]);
    // setProfilePic(e.target.files[0]);
  };
  const handleChange = (e) => {
    setAbout(e.target.value);
  };
  const writeAbout = () => {
    setAbout(!about);
  };
  const handleSave = async (e) => {
    e.preventDefault();
  };
  console.log("bg : " + bg);
  const currentUser = user?.email;
  console.log();
  useEffect(() => {
    const q = query(dpRef);
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().usermail === currentUser) {
          setPic(doc.data().photoURL);
          setBG(doc.data().bgImage);
        }
      });
      const q2 = query(nameRef);
      onSnapshot(q2, (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          if (doc.data().mail === currentUser) {
            items.push(doc.data().username);
          }
        });
        setName(items);
      });
      const q3 = query(postRef);
      onSnapshot(q3, (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    });
    //eslint-disable-next-line
  }, []);
  console.log("username in profile page: " + name);
  return (
    <div className="profile">
      <Header />
      <div className="profile__section">
        {bg ? (
          <img src={bg} alt="" />
        ) : (
          <img
            src="https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=790&h=196&q=90&fm=png"
            alt=""
          />
        )}
        <Avatar
          src={pic}
          className="profile__avatar"
          sx={{ width: 120, height: 120 }}
        />
        <div className="userDetails">
          <h2>{user.displayName || name}</h2>
          <p>{user.email}</p>
        </div>
        <div className="desc">
          {about && (
            <div
              style={{
                top: "230px",
                left: "33%",
                zIndex: "999",
                position: "inherit",
              }}
            >
              <textarea
                style={{
                  width: "600px",
                  height: "200px",
                  padding: "10px",
                  boxSizing: "border-box",
                  resize: "none",
                  border: "none",
                  borderWidth: "0",
                }}
                onChange={handleChange}
                placeholder="Write about yourself.."
              />
            </div>
          )}
          <Button onClick={writeAbout} className="about__button">
            {about ? "Close About" : "Write About Yourself"}
          </Button>
          <CreateIcon />
        </div>
        <div className="job__options">
          <button className="button1">Open to</button>
          <button className="button2">Add Profile Section</button>
          <button className="button3">More</button>
          <button className="button5">
            <input type="file" onChange={handlChange2} />
            <i className="fa-solid fa-upload"></i>Change your background picture
            here
          </button>
        </div>
        <button className="button6">Save Changes</button>
      </div>
      <Widgets />
    </div>
  );
}

export default Profile;
