import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
function SignUp() {
  const regexMail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordformat = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [Errormsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const userAuthRef = collection(db, "userAuth");
  const signUp = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || confirmPass === "") {
      alert("Enter all the fields");
    } else if (!email.match(regexMail)) {
      alert("Invalid email id");
    } else if (!password.match(passwordformat)) {
      setErrorMsg(
        "Password should contain atlest 8 charecters with captital letter, small letters and special charecter."
      );
    } else if (password !== confirmPass) {
      alert("Password not matching");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log(userCred);
        if (auth) {
          navigate("/");
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPass("");
          addDoc(userAuthRef, {
            username: name,
            mail: email,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="signUp">
      <Header />
      <img src="/images/Linkedin-Logo.png" alt="" />

      <form>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPass(e.target.value)}
          value={confirmPass}
        />
        <button className="register" onClick={signUp}>
          Register
        </button>
      </form>
      <p>
        Already a memeber ?
        <Link to="/login">
          <span className="login">Login</span>
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
