import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useStateValue } from "../StateProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [{ user }, dispatch] = useStateValue();
  const regexMail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passwordformat = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  const navigate = useNavigate();
  const [Errormsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Enter email / password");
    } else if (!email.match(regexMail)) {
      alert("Invalid email id");
    } else if (!password.match(passwordformat)) {
      setErrorMsg(
        "Password should contain atlest 8 charecters with captital letter, small letters and special charecter."
      );
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        if (auth) {
          setEmail("");
          setPassword("");
          navigate("/");
          console.log(userCred);
          toast.success("Login succesfful", {
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: false,
          });
        }
      })
      .catch((err) => {
        alert("Invalid password");
        navigate("/login");
        console.log(err.message);
      });
  };
  const signInGoogle = () => {
    signInWithGoogle()
      .then((userCred) => {
        toast.success("Login successful");
        if (userCred) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Container>
        <Nav>
          <Link to="/">
            <img src="/images/Linkedin-Logo.png" alt="" />
          </Link>
        </Nav>
        <Section>
          <Hero>
            <h1>
              <span className="login__title">Login </span>
              your Proffessional Community
            </h1>
            <img src="/images/login-logo2.svg" alt="" />
          </Hero>
          <Form>
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
            <button className="login" onClick={signIn}>
              Sign In
            </button>
            <p>OR</p>
            <Google onClick={signInGoogle}>
              <img src="/images/google.svg" alt="" />
              Sign In With Google
            </Google>
            <p>
              Not a memeber ?
              <Link to="/register">
                <span className="register">Register Now</span>
              </Link>
            </p>
          </Form>
        </Section>
        <ToastContainer />
      </Container>
    </div>
  );
}
const Container = styled.div`
  padding: 0px;
`;
const Nav = styled.nav`
  /* max-width: 1128px; */
  margin: 0;
  top: 0;
  padding: 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  flex-wrap: nowrap;
  img {
    width: 200px;
    height: 120px;
  }
  @media (max-width: 768px) {
    /* padding: 0 5px; */
    align-items: center;
    justify-content: center;
  }
`;
const Join = styled.div`
  display: flex;
  align-items: center;
`;
const Button1 = styled.div`
  button {
    font-size: 23px;
    font-weight: 600;
    padding: 15px 16px;
    border: none;
    background-color: transparent;
    color: rgba(0, 0, 0, 0.6);
    margin-right: 12px;
  }
  button:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    border-radius: 4px;
  }
`;
const Button2 = styled.div`
  button {
    font-size: 23px;
    color: #0a66c2;
    /* box-shadow: inset 0 0 0 1px #0a66c2; */
    border-radius: 40px;
    padding: 15px 16px;
    font-weight: 600;
    transition-duration: 167ms;
    padding: 10px 24px;
    text-align: center;
    border-color: #0a66c2;
    background-color: rgba(0, 0, 0, 0);
  }
  button:hover {
    cursor: pointer;
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
  }
`;
const Section = styled.section`
  display: flex;
  align-items: center;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  margin-left: 50px;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const Hero = styled.div`
  width: 100%;
  h1 {
    font-size: 56px;
    width: 60%;
    padding-bottom: 0;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;
  }

  @media (max-width: 800px) {
    h1 {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
    .login__title {
      font-size: 25px;
      font-weight: bold;
    }
  }
  img {
    width: 700px;
    height: 500px;
    position: absolute;
    margin-left: 800px;
    /* bottom: -10px;
    right: -500px; */
  }
  @media (max-width: 800px) {
    img {
      display: none;
    }
  }
`;
const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 350px;
    height: 50px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: none;
    background-color: white;
    font-size: 20px;
    padding-left: 10px;
  }
  .login {
    width: 360px;
    height: 50px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: none;
    background-color: #2977c9;
    font-size: 20px;
    color: white;
    font-weight: 600;
    transition: transform 100ms ease-in;
  }
  .register {
    color: #0177b7;
    cursor: pointer;
    text-decoration: underline;
  }
  .login:hover {
    cursor: pointer;
    transform: scale(1.05);
    background-color: rgba(207, 207, 207, 0.25);
    color: #2977c9;
  }
  p {
    text-align: center;
    margin-bottom: 20px;
  }
`;
const Google = styled.button`
  display: flex;
  align-items: center;
  font-size: 18px;
  padding: 15px 16px;
  border-radius: 5px;
  background-color: #fff;
  border: none;
  width: 370px;
  height: 50px;
  font-weight: 600;
  justify-content: center;
  z-index: 0;
  vertical-align: middle;
  cursor: pointer;
  transition-duration: 167ms;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
  img {
    margin-right: 20px;
  }
  :hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
  @media (max-width: 800px) {
    button {
      place-items: center;
      margin-left: 200px;
      top: 0;
      bottom: -10px;
    }
  }
`;
export default Login;
