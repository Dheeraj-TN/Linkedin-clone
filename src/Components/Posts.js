import React, { forwardRef, useState, useEffect } from "react";
import "./Posts.css";
import Avatar from "@mui/material/Avatar";
import PublicIcon from "@mui/icons-material/Public";
import InputOption from "./InputOption";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentIcon from "@mui/icons-material/Comment";
import RepeatIcon from "@mui/icons-material/Repeat";
import SendIcon from "@mui/icons-material/Send";

import moment from "moment";
const Posts = forwardRef(
  (
    {
      profilePicture,
      name,
      desc,
      msg,
      photo,
      mediaURL,
      emailUserName,
      time,
      article,
    },
    ref
  ) => {
    // const uploadTime = moment().endOf(time).fromNow();
    // console.log("DP:" + profilePicture);
    const [currentTime, setCurrentTime] = useState(moment());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(moment());
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

    function formatTime(time) {
      const timeDiff = moment.duration(currentTime.diff(time));
      const seconds = timeDiff.seconds();
      const minutes = timeDiff.minutes();
      const hours = timeDiff.hours();
      const days = timeDiff.days();
      const weeks = Math.floor(days / 7);

      if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
      } else if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""} ago`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      } else {
        return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
      }
    }
    return (
      <div ref={ref} className="posts">
        <div className="post__header">
          <Avatar src={profilePicture} alt="" />
          <div className="user__info">
            <h2>{name || emailUserName}</h2>
            <p>{desc}</p>
            <div className="post__time">
              <p>
                {formatTime(moment(time))} · <PublicIcon />
              </p>
            </div>
          </div>
        </div>
        <div className="post__body">
          <p>{msg}</p>
          <p style={{ marginTop: "20px", fontSize: "14px", fontWeight: "300" }}>
            {article}
          </p>
          {/* {mediaURL && <img src={mediaURL} alt="" />} */}
          {photo && <img src={photo} alt="" />}
          {/* {Video && (
            <video controls>
              <source src={Video} type="video/mp4" />
            </video>
          )} */}
        </div>
        <div className="post__buttons">
          <InputOption Icon={ThumbUpOffAltIcon} Title="Like" color="gray" />
          <InputOption Icon={CommentIcon} Title="Comment" color="gray" />
          <InputOption Icon={RepeatIcon} Title="Repost" color="gray" />
          <InputOption Icon={SendIcon} Title="Send" color="gray" />
        </div>
      </div>
    );
  }
);
export default Posts;
