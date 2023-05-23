import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import WorkIcon from "@mui/icons-material/Work";
import MessageIcon from "@mui/icons-material/Message";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "styled-components";
import "./Header.css";
import { Link } from "react-router-dom";
import HeaderOptions from "./HeaderOptions";
import { auth, db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { collection, onSnapshot, query, where } from "firebase/firestore";
function Header() {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const postRef = collection(db, "Post");
  const searchClicked = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      return;
    }
    sessionStorage.setItem("searchItem", searchTerm);
    setSearchTerm("");
    navigate("/search");
  };

  return (
    <div className="header">
      <div className="left">
        <a href="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt=""
          />
        </a>

        <div className="inputSearch">
          <SearchIcon onClick={searchClicked} />
          <input
            type="text"
            placeholder="Search people,jobs,.."
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>
      </div>

      <div className="right">
        <Link to="/">
          <HeaderOptions Icon={HomeIcon} title="Home" />
        </Link>
        <HeaderOptions Icon={GroupIcon} title="My Network" />
        <HeaderOptions Icon={WorkIcon} title="Jobs" />
        <HeaderOptions Icon={MessageIcon} title="Messages" />
        <HeaderOptions Icon={NotificationsIcon} title="Notifications" />
        <Link to="/profile">
          <HeaderOptions
            avatar="https://media.licdn.com/dms/image/D5603AQFIMrMwCncSRA/profile-displayphoto-shrink_100_100/0/1682049723813?e=1687996800&v=beta&t=tbKEY3DENepCha-Xlo2LaAwZoYvp4r_JgzQZZA1H5m4"
            title="Me"
          />
        </Link>

        <div className="rightMost">
          <HeaderOptions Icon={AppsIcon} title="For Business" />
          <HeaderOptions logout Icon={LogoutIcon} title="Logout" />
        </div>
      </div>
      <div className="hamburger">
        <HeaderRight>
          <Menu onClick={() => setBurgerStatus(true)}>
            <MenuIcon />
          </Menu>
        </HeaderRight>
        <BurgerMenu show={burgerStatus}>
          <CloseMenu>
            <CloseButton onClick={() => setBurgerStatus(false)}>
              <CloseIcon />
            </CloseButton>
          </CloseMenu>
          <li>
            <Link to="/">
              <HeaderOptions
                className="header__options"
                Icon={HomeIcon}
                title="Home"
              />
            </Link>
          </li>
          <li>
            <HeaderOptions
              className="header__options"
              Icon={GroupIcon}
              title="My Network"
            />
          </li>
          <li>
            <HeaderOptions
              className="header__options"
              Icon={WorkIcon}
              title="Jobs"
            />
          </li>
          <li>
            <HeaderOptions
              className="header__options"
              Icon={MessageIcon}
              title="Messages"
            />
          </li>
          <li>
            <HeaderOptions
              className="header__options"
              Icon={NotificationsIcon}
              title="Notifications"
            />
          </li>
          <li>
            <Link to="/profile">
              <HeaderOptions
                avatar="https://media.licdn.com/dms/image/D5603AQFIMrMwCncSRA/profile-displayphoto-shrink_100_100/0/1682049723813?e=1687996800&v=beta&t=tbKEY3DENepCha-Xlo2LaAwZoYvp4r_JgzQZZA1H5m4"
                title="Me"
              />
            </Link>
          </li>
          <li>
            <HeaderOptions
              className="header__options"
              Icon={AppsIcon}
              title="For Business"
            />
          </li>
          <li>
            <HeaderOptions logout Icon={LogoutIcon} title="Logout" />
          </li>
        </BurgerMenu>
      </div>
    </div>
  );
}
const HeaderRight = styled.div`
  padding-right: 20px;
  display: flex;
  cursor: pointer;
  right: 0;
  align-items: center;
`;
const Menu = styled(MenuIcon)`
  font-size: 40px !important;
`;
const BurgerMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background: white;
  width: 300px;
  z-index: 16;
  text-align: left;

  padding: 20px;
  list-style: none;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.2s ease-in;
  li {
    padding: 15px 5px;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  li:hover {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
`;
const CloseButton = styled(CloseIcon)`
  font-size: 30px !important;
  cursor: pointer;
`;
const CloseMenu = styled.div`
  display: flex;
  justify-content: flex-end !important;
`;
export default Header;
