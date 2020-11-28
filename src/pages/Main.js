import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import axios from "axios";
import MediaCard from "../components/MediaCard";

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "10rem",
    height: "calc(100vh - 19.0625rem)",
    textAlign: "center",
  },
  avatar: {
    margin: "1rem auto",
    backgroundColor: theme.palette.secondary.main,
  },
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
    <Container className={mainStyles.wrapper} maxWidth="sm">
      {userList?.map((user) => {
        return (
          <MediaCard
            key={user?.id}
            userImage={user?.picture}
            userName={`${user?.title} ${user?.firstName} ${user?.lastName}`}
            userEmail={user?.email}
          />
        );
      })}
    </Container>
  );
}

export default Main;
