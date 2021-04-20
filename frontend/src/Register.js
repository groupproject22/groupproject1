import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "./Register.css";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();
  const login = () => {
    history.push("/login");
  };

  let user = {
    name,
    email,
    password
  };

  const userRegister = async (e) => {
    e.preventDefault();
    const data = await Axios.post(
      "http://127.0.0.1:5000/api/register",
      user
    ).then((response) => {
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response));
      if (response.data.email) {
        history.push("/home");
      }
    });
    console.log(data);
  };

  const register = () => {};
  return (
    <div className="register">
      <div className="register__header">
        <div className="register__header__left"></div>
        <div className="register__header__right">
          <Card className="register__form__card">
            <form className="login-form">
              <input
                name="name"
                placeholder="name"
                id="password"
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
              />
              <input
                name="email"
                placeholder="Email address or phone number"
                required
                onChange={(e) => setEmail(e.target.value)}
                type="text"
              />
              <input
                name="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <button
                className="btn__register"
                onClick={userRegister}
                type="submit"
              >
                Register
              </button>
            </form>
            <a className="forget__account__register">Forgotten account?</a>
            <hr className="register__divider" />
            <button onClick={login} className="btn__register__login">
              Log In
            </button>
          </Card>
        </div>
      </div>
      <div className="register__footer">
        <img src="/images/footer_crop.jpg" alt="" />
      </div>
    </div>
  );
}

export default Register;
