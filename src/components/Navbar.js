import React, { useContext, useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { FirebaseAuthContext } from "../context/AuthContext";
import firebase from "../firebase/firebase.utils";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const { currentUser } = useContext(FirebaseAuthContext);
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const bigData = useMemo(
    () => ({
      a: "a",
      b: "b",
    }),
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSignOut = useCallback(() => {
    firebase.signOut();
  }, []);

  const goToSignUpPage = () => {
    history.push(`/register`);
  };

  const goToSignInPage = () => {
    history.push(`/login`);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            React Share
          </Typography>
          {currentUser && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {currentUser?.displayName}
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          )}
          {!currentUser && (
            <div>
              <Button color="inherit" onClick={goToSignUpPage}>Register</Button>
              <Button color="inherit" onClick={goToSignInPage}>Login</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
