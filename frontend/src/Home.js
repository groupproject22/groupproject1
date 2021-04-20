import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import FlagIcon from "@material-ui/icons/Flag";
import GroupIcon from "@material-ui/icons/Group";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import ImageIcon from "@material-ui/icons/Image";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import S3 from "react-aws-s3";
import userKey from "./keys";

import "moment-timezone";

import "./Home.css";
import { Button } from "@material-ui/core";
import axios from "axios";
// import user from "../../backend/models/userModels";

function Home() {
  let user = JSON.parse(localStorage.getItem("user"));
  const [post, setPost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [config, setConfig] = useState({});
  const [imageName, setImageName] = useState("");
  const [file, setFile] = useState({});
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const history = useHistory();
  const expandMore = () => {};

  useEffect(() => {
    allPost();
    getAllUsers();
  }, []);

  const sendPost = async (e) => {
    e.preventDefault();
    let userPost = {
      name: user.data.name,
      email: user.data.email,
      friends: user.data.friends,
      post,
      imageUrl
    };

    if (imageName) {
      const ReactS3Client = new S3(config);
      ReactS3Client.uploadFile(file, imageName)
        .then((data) => {
          console.log(data);
          //setImageUrl(data.location);
          userPost.imageUrl = data.location;
          savePost(userPost);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      savePost(userPost);
    }
  };

  const savePost = async (userPost) => {
    if (!userPost.post) {
      toast.warning("Post can not be blank");
    } else {
      const data = await axios
        .post("http://127.0.0.1:5000/api/userpost", userPost)
        .then((response) => {
          console.log("post is!!!");
          console.log(response);
          allPost();
        })
        .catch((err) => {
          alert("Invalid post");
        });
      console.log(data);
    }
  };

  // const saveFriendPost = async (email) => {
  //   let user = {
  //     userid: user.data.email,
  //     friends: email
  //   };
  //   const data = await axios
  //     .post("http://127.0.0.1:5000/api/saveFriendPost", user)
  //     .then((response) => {
  //       console.log("post is!!!");
  //       console.log(response);
  //       allPost();
  //     })
  //     .catch((err) => {
  //       alert("Invalid post");
  //     });
  //   console.log(data);
  // };

  const friendRequest = async (post) => {
    let user1 = {
      email: post.email,
      id: user.data._id,
      userId: post._id,
      userEmail: user.data.email
    };
    const data = await axios
      .post("http://127.0.0.1:5000/api/friendrequest", user1)
      .then((response) => {
        console.log("post is!!!");
        console.log(response);
        toast("Successfully follow.");
        // allPost();
        // saveFriendPost(post.email);
      })
      .catch((err) => {
        alert("Invalid post");
      });
    console.log(data);
  };

  const allPost = async () => {
    const data = await axios
      .get("http://127.0.0.1:5000/api/allposts")
      .then((response) => {
        console.log("all post are");
        console.log(response);
        setAllPosts(response.data);
      })
      .catch((err) => {
        alert("Invalid post");
      });
  };

  const getAllUsers = async () => {
    const data = await axios
      .get("http://127.0.0.1:5000/api/allusers")
      .then((response) => {
        console.log("all post are");
        console.log(response);
        setAllUsers(response.data);
      })
      .catch((err) => {
        alert("Invalid post heer");
      });
  };

  const AllUsers = () => {
    return (
      <div>
        {allUsers
          .map((post) => {
            if (user?.data.email != post.email) {
              return (
                <Card className="userPostListing">
                  <div className="usernamedate">
                    <span>{post.name}</span>
                    <Button onClick={() => friendRequest(post)}>Follow</Button>
                  </div>
                </Card>
              );
            }
          })
          .reverse()}
      </div>
    );
  };

  const upload = (e) => {
    e.preventDefault();
    setImageName(e.target.files[0].name);
    // let filename = e.target.files[0].name;
    setFile(e.target.files[0]);
    setConfig({
      accessKeyId: userKey.accessId,
      secretAccessKey: userKey.accessKey,
      bucketName: "usersposts",
      region: "us-east-2"
    });
  };

  const groups = () => {
    history.push("/groups");
  };

  const GetAllPosts = () => {
    return (
      <div>
        {allPosts
          .map((post) => {
            if (
              user?.data.friends.includes(post.email) ||
              user.data.email == post.email
            ) {
              return (
                <Card className="userPostListing">
                  <div className="usernamedate">
                    <span>{post.name}</span>
                    <span>
                      <Moment format="DD/MM/YYYY">{post.createdAt}</Moment>
                    </span>
                  </div>
                  <div className="userpost">
                    {post.imageUrl && (
                      <img
                        className="user__post__img"
                        src={post.imageUrl}
                        alt=""
                      />
                    )}

                    <span className="user__post__title">{post.post}</span>
                  </div>
                </Card>
              );
            }
          })
          .reverse()}
      </div>
    );
  };

  let cardImages = [
    {
      backgroundImg:
        "https://cdn.pixabay.com/photo/2016/10/09/15/32/chromatic-1726002_960_720.jpg",
      name: "Rahul Sharma"
    },
    {
      backgroundImg:
        "https://media.istockphoto.com/photos/green-leaf-with-dew-on-dark-nature-background-picture-id1050634172?k=6&m=1050634172&s=612x612&w=0&h=C6CWho9b4RDhCqvaivYOLV2LK6FzygYpAyLPBlF1i2c=",
      name: "John"
    },
    {
      backgroundImg:
        "https://media.istockphoto.com/photos/green-leaf-with-dew-on-dark-nature-background-picture-id1050634172?k=6&m=1050634172&s=612x612&w=0&h=C6CWho9b4RDhCqvaivYOLV2LK6FzygYpAyLPBlF1i2c=",
      name: "Vivek Sharma"
    },
    {
      backgroundImg:
        "https://images.jdmagicbox.com/comp/hyderabad/e1/040pxx40.xx40.170223121549.i5e1/catalogue/pride-honda-miyapur-hyderabad-car-dealers-honda-e1ucm.jpg?clr=#4d1a33",
      name: "Aman Verma"
    },
    {
      backgroundImg:
        "https://i.pinimg.com/originals/66/5a/b5/665ab53eecb5fed003d2a17fb3bbba8d.jpg",
      name: "Tushar Chopra"
    }
  ];

  // let user = localStorage.getItem("user");
  // if (user) {
  //   user = JSON.parse(localStorage.getItem("user"));
  // }
  // console.log(user);

  return (
    <div className="home">
      <div className="home__left">
        <div className="home__left__upper">
          <div className="home__left__icon active">
            <AccountCircleIcon />
            <span>{user ? user.data.name : "user"}</span>
          </div>
          <div className="home__left__icon">
            <LocalHospitalIcon />
            <span>COVID1-19 information Center</span>
          </div>

          <div className="home__left__icon">
            <FlagIcon />
            <span>Pages</span>
          </div>
          <div className="home__left__icon">
            <GroupIcon />
            <span>Friends</span>
          </div>
          <div className="home__left__icon">
            <ChatBubbleIcon />
            <span onClick={groups}>Groups</span>
          </div>
          <div className="home__left__icon">
            <ExpandMoreIcon onClick={expandMore} />
            <span>See More</span>
          </div>
        </div>
        <hr className="home__left__divider" />
        <div className="home__left__bottom">Follow Friends</div>
        <div>{AllUsers()}</div>
        <ToastContainer />
      </div>
      <div className="home__center">
        <div className="home__center__cards">
          {cardImages.map((item, index) => {
            return (
              <Card key={index} className="home__center__card">
                <img
                  className="home__center__img"
                  src={item.backgroundImg}
                  alt=""
                />
                <img
                  className="card__avatar"
                  src="https://i1.wp.com/www.menstylefashion.com/wp-content/uploads/2019/03/male-model-menstylefashion-4.jpg?resize=750%2C499&ssl=1"
                />
                <span className="home__cenmter__user__name">{item.name}</span>
              </Card>
            );
          })}
        </div>
        <div className="home__center__post">
          <Card className="">
            <div className="user__post">
              <img
                className="card__avatar__post"
                src="https://i1.wp.com/www.menstylefashion.com/wp-content/uploads/2019/03/male-model-menstylefashion-4.jpg?resize=750%2C499&ssl=1"
              />
              <input
                className="home__center__post__input"
                placeholder="Whats on your mind "
                value={post}
                onChange={(e) => setPost(e.target.value)}
                type="text"
              />
            </div>

            <div className="postupload">
              <ImageIcon />
              <input type="file" onChange={(e) => upload(e)} />

              <Button
                variant="contained"
                color="primary"
                onClick={(e) => sendPost(e)}
              >
                Post
              </Button>
            </div>

            {/* <div className="user__post__service">
              <div>
                <VideoCallIcon />
              </div>
              <div>
                <PhotoIcon />
              </div>
              <div>
                <MoodIcon />
              </div>
            </div> */}
          </Card>

          <div>{GetAllPosts()}</div>
        </div>
      </div>

      <div className="home__right">
        <img src="images/feed.jpg" alt="" />
      </div>
    </div>
  );
}

export default Home;
