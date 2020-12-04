import React, { useEffect, useState } from "react";
import cx from 'clsx';
import { useParams, useHistory } from "react-router-dom";
import { fetchData } from "../helper/FetchData";
import { makeStyles } from '@material-ui/core/styles';
import { formatDateFunc } from "../helper/FormatDate";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ChevronLeftRounded from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import { Container, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'flex',
        minHeight: '100vh',
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: "85%",
        marginTop: "5rem",
        marginBottom: "2rem",
    },
    circular: {
        margin: 'auto',
    },
    root: {
        maxWidth: 400,
        margin: 'auto',
        boxShadow: 'none',
        borderRadius: 8,
        marginTop: 24,
    },
    content: {
        padding: 24,
    },
    cta: {
        marginTop: 24,
        textTransform: 'initial',
    },
}));

export const UserDetail = React.memo(function NewsCard() {
    const styles = useStyles();
    const mediaStyles = useWideCardMediaStyles();
    const textCardContentStyles = useN01TextInfoContentStyles();
    const shadowStyles = useBouncyShadowStyles();
    const history = useHistory();
    const { id } = useParams();

    const handlePostButtonClick = () => {
        history.push(`/user/${id}/post`);
    };
    const handleBackButtonClick = () => {
        history.push('/');
    };

    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        fetchData(`/user/${id}`)
            .then((res) => setUserDetail(res))
            .catch((err) => console.log(err))
            .finally();
    }, [id]);
    //console.log(userDetail);
    return (
        <Container className={styles.wrapper}>
            {!userDetail == null ? (
                <CircularProgress className={styles.circular} />
            ) : (
                    <>
                        <Card className={cx(styles.root, shadowStyles.root)}>
                            <CardMedia
                                classes={mediaStyles}
                                image={userDetail?.picture}
                            />
                            <CardContent className={styles.content}>
                                <TextInfoContent
                                    classes={textCardContentStyles}
                                    overline={'Phone Number: ' + userDetail?.phone}
                                    heading={'Address: '}
                                    body={`${userDetail?.location?.country} / ${userDetail?.location?.street} ${userDetail?.location?.city} ${userDetail?.location?.state}  `}
                                />
                            </CardContent>
                        </Card>
                        <Card className={cx(styles.root, shadowStyles.root)}>
                            <CardContent className={styles.content}>
                                <TextInfoContent
                                    classes={textCardContentStyles}
                                    heading={userDetail?.firstName + ' ' + userDetail?.lastName}
                                    body={
                                        `${userDetail?.firstName} lives in ${userDetail?.location?.country} and 
                                            registered on ${formatDateFunc(userDetail?.registerDate)}. 
                                            ${userDetail?.firstName}'s birthday is on ${formatDateFunc(userDetail?.dateOfBirth)}.`
                                    }
                                />
                                <Button onClick={handlePostButtonClick} color={'primary'} fullWidth className={styles.cta}>
                                    View {userDetail?.firstName} Posts.. <ChevronRightRounded />
                                </Button>
                                <Button onClick={handleBackButtonClick} color={'primary'} fullWidth className={styles.cta}>
                                    <ChevronLeftRounded /> Back to home..
                                </Button>
                            </CardContent>
                        </Card>
                    </>
                )}
        </Container>
    );
});

export default UserDetail;
                                        
//comment
