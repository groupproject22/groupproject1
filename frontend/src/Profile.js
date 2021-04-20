import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

import "./Profile.css";
import { Button } from "@material-ui/core";

function Profile() {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mnumber, setMNumber] = useState("");
  const [uExist, setUExist] = useState(false);

  let user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getProfile();
  }, []);

  let profileuser = {
    fname,
    lname,
    mnumber,
    email,
    address
  };

  const createProfile = async (e) => {
    e.preventDefault();

    const data = await Axios.post(
      "http://127.0.0.1:5000/api/profile",
      profileuser
    )
      .then((response) => {
        console.log(response);
        localStorage.setItem("profile", JSON.stringify(response));
        toast("Profile created successfully.");
        getProfile();
      })
      .catch((err) => {
        alert("Invalid user");
      });
    console.log(data);
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const data = await Axios.put(
      "http://127.0.0.1:5000/api/profile",
      profileuser
    )
      .then((response) => {
        console.log(response);
        localStorage.setItem("profile", JSON.stringify(response));
        toast("Profile updated successfully.");
        getProfile();
      })
      .catch((err) => {
        alert("Invalid user");
      });
    console.log(data);
  };

  const getProfile = async (e) => {
    const data = await Axios.post("http://127.0.0.1:5000/api/getprofile", {
      email: user.data.email
    })
      .then((response) => {
        console.log("user profile is");
        console.log(response);
        setFirstName(response.data.fname);
        setLastName(response.data.lname);
        setEmail(response.data.email);
        setMNumber(response.data.mnumber);
        setAddress(response.data.address);
        setUExist(true);
      })
      .catch((err) => {
        console.log(err);
        setUExist(false);
      });
    console.log(data);
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <Card className="profile__user">
          <form className="profile__form">
            <div className="profile__form__fields">
              <TextField
                id="fname"
                className="profile__user__inp"
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={fname}
              />
              <TextField
                id="lname"
                className="profile__user__inp"
                label="Last Name"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <TextField
                id="email"
                className="profile__user__inp"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="profile__form__fields">
              <TextField
                id="number"
                label="mobile Number"
                value={mnumber}
                onChange={(e) => setMNumber(e.target.value)}
                type="number"
              />
            </div>
            <div>
              <TextField
                id="address"
                className="profile__user__inp"
                label="address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            {!uExist ? (
              <div className="profile__form__submit">
                <Button
                  variant="contained"
                  onClick={createProfile}
                  color="primary"
                >
                  Submit
                </Button>
              </div>
            ) : (
              <div className="profile__form__submit">
                <Button
                  variant="contained"
                  onClick={updateProfile}
                  color="primary"
                >
                  Update
                </Button>
              </div>
            )}
          </form>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
