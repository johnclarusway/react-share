import axios from "axios";
const { REACT_APP_API_BASE_URL, REACT_APP_API_TOKEN } = process.env;

export const fetchData = async (path) => {
  const response = await axios.get(`${REACT_APP_API_BASE_URL}${path}`, {
    headers: {
      "app-id": REACT_APP_API_TOKEN,
    },
  });
  return response?.data;
};
