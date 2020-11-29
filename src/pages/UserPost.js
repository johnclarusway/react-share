import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../helper/FetchData";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, CircularProgress } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { formatDateFunc } from "../helper/FormatDate";
import UserPostCard from "../components/UserPostCard";
import { PostAdd } from "@material-ui/icons";

const stylesFunc = makeStyles((theme) => ({
  wrapper: {
    marginTop: "10rem",
    minHeight: "calc(100vh - 19.0625rem)",
    textAlign: "center",
  },
  avatar: {
    margin: "1rem auto",
    backgroundColor: theme.palette.secondary.main,
  },
}));
function UserPost() {
  const { id } = useParams();
  const mainStyles = stylesFunc();

  const [userPost, setUserPost] = useState();

  // TODO: fill in catch finally
  useEffect(() => {
    fetchData(`/user/${id}/post`)
      .then((res) => setUserPost(res?.data))
      .catch()
      .finally();
  }, [id]);

  return (
    <Container className={mainStyles.wrapper}>
      {!userPost ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={1}>
          {userPost?.map((post) => {
            const { firstName, lastName } = post.owner;
            return (
              <Grid item sm={4} xs={6} key={post?.id}>
                <UserPostCard
                  id={post.id}
                  userInitial={firstName[0]}
                  title={`${firstName} ${lastName}`}
                  subheader={formatDateFunc(post.publishDate)}
                  imgSrc={post.image}
                  imgTitle="Image Title"
                  description={post.text}
                  likes={post.likes}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}

export default UserPost;
