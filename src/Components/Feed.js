import React, { useEffect, useState } from "react";
import "./Feed.css";
import Avatar from "@mui/material/Avatar";
import InputOption from "./InputOption";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import EventIcon from "@mui/icons-material/Event";
import ArticleIcon from "@mui/icons-material/Article";
import Posts from "./Posts";
import { db, storage } from "../firebase";
import FlipMove from "react-flip-move";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import moment from "moment";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Events from "./Events";
import { Button } from "@mui/material";
function Feed() {
  const [pic, setPic] = useState(null);
  const [username, setUsername] = useState("");
  const [input, setInput] = useState("");
  const [inputMedia, setInputMedia] = useState("");
  const [posts, setPosts] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const currentUser = user.email;
  const [postImg, setPostImg] = useState(null);
  const [Pimage, setPImage] = useState(null);
  // const [video, setVideo] = useState(null);
  // const [pVideo, setPVideo] = useState("");
  const dpRef = collection(db, "UserDetails");
  const postRef = collection(db, "Post");
  const [events, setEvents] = useState(false);
  const [article, setArticle] = useState(false);
  const [text, setText] = useState("");
  const [writeText, setWriteText] = useState("");
  const [disabled, setDisabled] = useState(false);
  const usernameRef = collection(db, "userAuth");
  const now = new Date();
  const myDate = moment(now).format("YYYY-MM-DDTHH:mm:ssZ");
  const showDates = () => {
    setEvents(!events);
  };
  const writeArticle = () => {
    setArticle(!article);
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleChange2 = (e) => {
    setPostImg(e.target.files[0]);
  };
  // const handleChange3 = (e) => {
  //   setVideo(e.target.files[0]);
  // };
  useEffect(() => {
    const q = query(postRef, orderBy("time", "desc"));
    const Posts = onSnapshot(q, (snaphot) => {
      const items = [];
      snaphot.forEach((doc) => {
        items.push(doc.data());
      });

      setPosts(items);
    });
    const q2 = query(dpRef);
    onSnapshot(q2, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().usermail === currentUser) {
          setPic(doc.data().photoURL);
        }
      });
    });
    const q3 = query(usernameRef);
    onSnapshot(q3, (snaphot) => {
      const items = [];
      snaphot.forEach((doc) => {
        if (doc.data().mail === currentUser) {
          items.push(doc.data().username);
        }
      });
      setUsername(items);
    });
    return () => {
      Posts();
    };
    //eslint-disable-next-line
  }, []);
  console.log("name of emaillogin : " + username);
  const save = async (e) => {
    e.preventDefault();
    setWriteText(text);
  };
  const save2 = async (e) => {
    e.preventDefault();
    const postImgRef = ref(storage, `posts/${postImg?.name}`);
    uploadBytes(postImgRef, postImg)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setPImage(url);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
    setDisabled(true);
  };
  console.log("PostImg: " + Pimage);
  const SendPost = async (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      alert("Empty msgs cannot be sent");
      return;
    }
    // const postImgRef = ref(storage, `posts/${postImg?.name}`);
    // uploadBytes(postImgRef, postImg)
    //   .then((snapshot) => {
    //     getDownloadURL(snapshot.ref)
    //       .then((url) => {
    //         setPImage(url);
    //       })
    //       .catch((err) => {
    //         console.log(err.message);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    // const videoRef = ref(storage, `posts/${video?.name}`);
    // uploadBytes(videoRef, video)
    //   .then((snaphot) => {
    //     getDownloadURL(snaphot.ref)
    //       .then((url) => {
    //         setPVideo(url);
    //       })
    //       .catch((err) => {
    //         console.log(err.message);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    const docRef = await addDoc(postRef, {
      profilePicture: pic,
      name: user.displayName,
      emailUserName: username,
      desc: user.email,
      msg: input,
      photo: Pimage,
      mediaURL: inputMedia,
      // Video: pVideo,
      time: myDate,
      article: writeText,
    });
    console.log(docRef);

    console.log("Article : " + writeText);
    console.log("Article : " + text);
    // console.log("PostVideo : " + pVideo);
    setInput("");
    setInputMedia("");
    setText("");
    setWriteText("");
    // setPostImg(null);
    // setPImage(null);

    setArticle(!article);
  };
  return (
    <div className="feed">
      <div className="feed__input">
        <div className="feed__inputTop">
          <Avatar src={pic} className="avatar" />
          <input
            type="text"
            placeholder="Start a post"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <input
            className="uploadMedia__option"
            type="text"
            placeholder="Media URL"
            onChange={(e) => setInputMedia(e.target.value)}
            value={inputMedia}
          />
          <button onClick={SendPost}>Post</button>
        </div>
        <div className="feed__inputOption">
          <div className="feed__inputOption1">
            <input type="file" id="file" onChange={handleChange2} />
            <ImageIcon style={{ color: "#6C9BCF" }} />
            <label htmlFor="file">IMAGE</label>
            <button onClick={save2} disabled={disabled}>
              Save
            </button>
          </div>
          <div className="feed__inputOption1">
            {/* <input type="file" id="file" onChange={handleChange3} /> */}
            <VideocamIcon style={{ color: "green" }} />
            <label htmlFor="file">VIDEO</label>
          </div>
          <div className="feed__inputOption1">
            {events && <Events />}
            <EventIcon style={{ color: "orange" }} />
            <Button onClick={showDates} className="event__button">
              {events ? "Hide Events" : "Events"}
            </Button>
          </div>
          <div className="feed__inputOption1">
            {article && (
              <div
                style={{
                  position: "absolute",
                  top: "230px",
                  left: "33%",
                  zIndex: "999",
                }}
              >
                <textarea
                  style={{
                    width: "600px",
                    height: "200px",
                    padding: "10px",
                    boxSizing: "border-box",
                    resize: "none",
                  }}
                  value={text}
                  onChange={handleChange}
                  placeholder="Start an article.."
                />
                <button onClick={save}>Save</button>
              </div>
            )}
            <ArticleIcon style={{ color: "red" }} />
            <Button onClick={writeArticle} className="event__button">
              {article ? "Close Article" : "Article"}
            </Button>
          </div>
        </div>
      </div>
      <FlipMove>
        {posts.map((post) => {
          return (
            <Posts
              key={JSON.stringify(post)}
              profilePicture={post.profilePicture}
              name={post.name}
              emailUserName={post.emailUserName}
              desc={post.desc}
              msg={post.msg}
              photo={post.photo}
              mediaURL={post.mediaURL}
              time={post.time}
              article={post.article}
            />
          );
        })}
      </FlipMove>
    </div>
  );
}

export default Feed;
