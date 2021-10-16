import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../../config";
import "./register.css";

function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordCheck = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordCheck.current.value !== password.current.value) {
      passwordCheck.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axiosInstance.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
      console.log(user);
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              required
              placeholder="Username"
              className="loginInput"
              ref={username}
            />
            <input
              required
              placeholder="Email"
              className="loginInput"
              ref={email}
              type="email"
            />
            <input
              required
              placeholder="Password"
              className="loginInput"
              ref={password}
              type="password"
            />
            <input
              required
              placeholder="Re-Enter Password"
              className="loginInput"
              ref={passwordCheck}
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
