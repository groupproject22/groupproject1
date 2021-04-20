import React, { useEffect, useState } from "react";
import StorefrontIcon from "@material-ui/icons/Storefront";
import NotificationsIcon from "@material-ui/icons/Notifications";
import InboxIcon from "@material-ui/icons/Inbox";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { makeStyles } from "@material-ui/core/styles";
import S3 from "react-aws-s3";
import userKey from "../keys";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import ImageIcon from "@material-ui/icons/Image";
import Moment from "react-moment";
import axios from "axios";
import "./Group.css";
import { Button, TextField } from "@material-ui/core";

function Groups() {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState({});
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [config, setConfig] = useState({});
  const [imageName, setImageName] = useState("");
  const [marketPlacedata, setAllMarketPlacedata] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getMarketPlaceData();
  }, []);

  const upload = (e) => {
    e.preventDefault();
    setImageName(e.target.files[0].name);
    // let filename = e.target.files[0].name;
    setFile(e.target.files[0]);
    setConfig({
      accessKeyId: userKey.accessId,
      secretAccessKey: userKey.accessKey,
      bucketName: "marketplace3",
      region: "us-east-2"
    });
  };

  const sendPost = async (e) => {
    e.preventDefault();
    let item = {
      itemName,
      price,
      imageUrl
    };

    if (imageName) {
      const ReactS3Client = new S3(config);
      ReactS3Client.uploadFile(file, imageName)
        .then((data) => {
          console.log(data);
          //setImageUrl(data.location);
          item.imageUrl = data.location;
          savePost(item);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      savePost(item);
    }
  };

  const savePost = async (item) => {
    const data = await axios
      .post("http://127.0.0.1:5000/api/marketplace", item)
      .then((response) => {
        console.log("post is!!!");
        console.log(response);
        getMarketPlaceData();
      })
      .catch((err) => {
        alert("Invalid post");
      });
    console.log(data);
  };

  const getMarketPlaceData = async () => {
    const data = await axios
      .get("http://127.0.0.1:5000/api/marketplacedata")
      .then((response) => {
        console.log("market place data");
        console.log(response);
        setAllMarketPlacedata(response.data);
      })
      .catch((err) => {
        alert("Invalid post");
      });
  };

  const body = (
    <div className="listingmodal">
      <form className="marketPlace__form">
        <span className="listingmodal__item__desc">Create the group</span>
        <div className="listingmodal__items">
          <div className="listingmodal__item">
            <span>Group Name</span>
            <TextField
              placeholder="Enter your item name"
              onChange={(e) => setItemName(e.target.value)}
              type="text"
            />
          </div>
          <div className="listingmodal__item">
            <span>Group description</span>
            <TextField
              placeholder="Enter your item price"
              onChange={(e) => setPrice(e.target.value)}
              type="text"
            />
          </div>
          <div className="listingmodal__item">
            <span>Upload</span>
            <input type="file" onChange={(e) => upload(e)} />
          </div>
        </div>
        <Button
          variant="contained"
          className="submit__item"
          //   onClick={(e) => sendPost(e)}
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );

  const GetAllPosts = () => {
    return (
      <div className="marketplace__right_itemlisting">
        {marketPlacedata
          .map((post) => {
            return (
              <Card className="marketPlacePostListing">
                <div className="item__header">
                  <span>{post.itemName}</span>

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
                </div>
                <span>${post.price}</span>
              </Card>
            );
          })
          .reverse()}
      </div>
    );
  };

  return (
    <div className="marketPlace">
      <div className="marketPlace__left">
        <div className="sidebar__nav">
          <div className="sidebar__nav__item">
            <StorefrontIcon className="sidebar__nav__icon" />
            <span>Browse All</span>
          </div>
          <div className="sidebar__nav__item">
            <NotificationsIcon className="sidebar__nav__icon" />
            <span>Notification</span>
          </div>
          <div className="sidebar__nav__item">
            <InboxIcon className="sidebar__nav__icon" />
            <span>Inbox</span>
          </div>
          <div className="sidebar__nav__item">
            <ShoppingCartIcon className="sidebar__nav__icon" />
            <span>Basket</span>
          </div>
          <div className="sidebar__nav__item">
            <AccountBoxIcon className="sidebar__nav__icon" />
            <span>Your account</span>
          </div>
          <div className="sidebar__nav__item">
            <button className="new__listing" type="button" onClick={handleOpen}>
              Create Group
            </button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </div>
      </div>
      <div className="marketPlace__right">
        {/* <div>{GetAllPosts()}</div> */}
      </div>
    </div>
  );
}

export default Groups;
