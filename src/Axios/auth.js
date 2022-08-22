import Request from "./index";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const apiLogin = (data) => Request.post("/login", data);

export const apiLogin2 = (data) => {
    try {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/login`, data)
            .then((res) => {
                console.log(res);
                cookies.set("user", res.data, { path: "/" });
            });
    } catch (e) {
        console.log(e);
    }
};
export const apiRegister = (data) => {
    try {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/api/user`, data)
            .then((res) => {
                console.log(res);
            });
    } catch (e) {
        console.log(e);
    }
};
