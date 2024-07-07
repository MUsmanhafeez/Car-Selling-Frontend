import axios from "axios";

export const addCarRecord = async (payload) => {
  let token = localStorage.getItem("token");

  return await axios
    .post(`${process.env.BACKEND_BASEURL}/car/create`, payload, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data || error;
    });
};
