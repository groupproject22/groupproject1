import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const createAccount = () => {
    history.push("/register");
  };
  let user = {
    email,
    password
  };

  const userLogin = async (e) => {
    e.preventDefault();
    const data = await Axios.post("http://127.0.0.1:5000/api/login", user)
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response));
        if (
          email == response.data.email &&
          password == response.data.password
        ) {
          toast("User login successfully.");
          setTimeout(() => {
            history.push("/home");
          }, 2000);
        } else {
          toast("Username and password not correct.");
        }
      })
      .catch((err) => {
        alert("Invalid user");
      });
    console.log(data);
  };

  return (
    <div className="login">
      <div className="login__header">
        <div className="login__header__left">
          <img alt="logo" src="images/fb-logo-1.jpg" />
          <h2>
            Facebook helps you connect and share with the people in your life.
          </h2>
        </div>
        <div className="login__header__right">
          <Card className="login__form__card">
            <form className="login-form">
              <input
                name="email"
                placeholder="Email address or phone number"
                onChange={(e) => setEmail(e.target.value)}
                required
                type="text"
              />
              <input
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
              <button className="btn__login" onClick={userLogin} type="submit">
                Log In
              </button>
            </form>
            <a className="forget__account">Forgotten account?</a>
            <hr className="login__divider" />
            <button onClick={createAccount} className="btn__login__register">
              Create New Account
            </button>
          </Card>
        </div>
      </div>
      <div className="login__footer">
        <img src="/images/footer_crop.jpg" alt="" />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
