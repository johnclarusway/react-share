import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../helper/FetchData";

function UserDetail() {
  const { id } = useParams();

  useEffect(() => {
    fetchData(`/user/${id}`).then((data) => console.log(data));
  }, []);

  return <div>{id}</div>;
}

export default UserDetail;
