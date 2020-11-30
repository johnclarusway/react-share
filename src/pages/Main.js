import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  capitalize,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import MediaCard from "../components/MediaCard";

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    maxWidth:"85%",
    marginTop: "5rem",
    marginBottom:"2rem",
    textAlign: "center",
  },
  avatar: {
    margin: "1rem auto",
    backgroundColor: theme.palette.secondary.main,
  },
  circular:{
    margin:'auto',
  }
}));

function Main() {
  const [userList, setUserList] = useState();
  const mainStyles = stylesFunc();
  const { REACT_APP_API_BASE_URL, REACT_APP_API_TOKEN } = process.env;

  const fetchData = async () => {
    const response = await axios.get(`${REACT_APP_API_BASE_URL}/user`, {
      headers: {
        "app-id": REACT_APP_API_TOKEN,
      },
    });
    setUserList(response?.data?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className={mainStyles.wrapper}>
      {!userList ? (
        //TODO: center loading icon
        <CircularProgress className={mainStyles.circular}/>
      ) : (
        <Grid container spacing={1}>
          {userList?.map((user) => {
            return (
              <Grid item lg={3} md={4} sm={6} xs={12} key={user?.id}>
                <MediaCard
                  id={user.id}
                  userImage={user?.picture}
                  userName={`${capitalize(user?.title)} ${user?.firstName} ${
                    user?.lastName
                  }`}
                  userEmail={user?.email}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}

export default Main;
