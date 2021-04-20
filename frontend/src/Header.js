import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import StorefrontIcon from "@material-ui/icons/Storefront";
import GroupIcon from "@material-ui/icons/Group";
import FlagIcon from "@material-ui/icons/Flag";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./Header.css";

function Header() {
  const [isExpandMore, setisExpandMore] = useState(false);
  const history = useHistory();
  const expandMore = () => {};

  // let user = localStorage.getItem("user");
  // if (user) {
  //   user = JSON.parse(localStorage.getItem("user"));
  // }
  //console.log(user);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    history.push("/login");
  };
  const profile = () => {
    history.push("/profile");
  };
  const marketPlace1 = () => {
    history.push("/marketplace");
  };
  const Home = () => {
    history.push("/");
  };

  return (
    <div className="header">
      <div className="header__left">
        <img src="images/fb-head.jpg" onClick={Home} alt="" />
        <div className="header__left__search">
          <input type="text" placeholder="Search" />
          <SearchIcon className="header__search__icon" />
        </div>
      </div>
      <div className="header__center">
        <div className="header__center__icon active">
          <HomeIcon onClick={Home} />
        </div>
        <div className="header__center__icon">
          <OndemandVideoIcon />
        </div>
        <div className="header__center__icon">
          <StorefrontIcon onClick={marketPlace1} />
        </div>
        <div className="header__center__icon">
          <GroupIcon />
        </div>
        <div className="header__center__icon">
          <FlagIcon />
        </div>
      </div>
      <div className="header__right">
        <div className="header__right__icon header__right__first">
          <AccountCircleIcon onClick={profile} />
        </div>
        <div className="header__right__icon">
          <AddIcon />
        </div>
        <div className="header__right__icon">
          <ForumIcon />
        </div>
        <div className="header__right__icon">
          <NotificationsIcon />
        </div>
        <div className="header__right__icon">
          <ExpandMoreIcon onClick={() => setisExpandMore(!isExpandMore)} />
        </div>
        <Card className={`${isExpandMore ? "showExpandMore" : "hidden"}`}>
          <CardContent onClick={logout} className="showExpandMore__card">
            {/* <Typography color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="h2">
              hello
            </Typography>
            <Typography color="textSecondary">adjective</Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography> */}
            <div>
              <ExitToAppIcon />
            </div>
            <div>Logout</div>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </div>
    </div>
  );
}

export default Header;
