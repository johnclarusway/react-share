import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../helper/FetchData";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { formatDateFunc } from "../helper/FormatDate";

const stylesFunc = makeStyles((theme) => ({
  avatar: {
    margin: "1rem auto",
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    display: 'flex',
    marginTop: '2rem',
    height: "calc(100vh - 19.0625rem)",
    backgroundColor: theme.palette.action.selected,
    width: '95%',
    maxWidth: 850,
    margin: 'auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',

  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '80%',
    maxWidth: 600,
    height: '100%',
  },
}));

function UserDetail() {
  const { id } = useParams();
  const mainStyles = stylesFunc();

  const [userDetail, setUserDetail] = useState();
  useEffect(() => {
    fetchData(`/user/${id}`)
      .then((res) => {
        console.log(res);
        setUserDetail(res);
      }
      )
      .catch()
      .finally();
  }, [id]);

  return (
      <Card className={mainStyles.root}>
        <div className={mainStyles.details}>
          <CardContent className={mainStyles.content}>
            {!userDetail ? (
              <CircularProgress />
            ) : (
                <>
                  <Typography component="h5" variant="h5">{userDetail?.firstName} {userDetail?.lastName}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {userDetail?.location?.country}, {userDetail?.location?.city}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">{userDetail?.phone}</Typography>
                  {userDetail?.registerDate && (
                    <Typography variant="subtitle1" color="textSecondary">
                      {formatDateFunc(userDetail.registerDate)}
                    </Typography>
                  )}
                </>
              )}
          </CardContent>
        </div>
        <CardMedia
          className={mainStyles.cover}
          image={userDetail?.picture}
          title={userDetail?.firstName}
        />
      </Card>
  );
}

export default UserDetail;