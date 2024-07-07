import axios from "axios";


export const login = async(payload) => {
    return await axios
        .post(`${process.env.BACKEND_BASEURL}/user/login`, payload)
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            return error.response.data || error;
        });
};
