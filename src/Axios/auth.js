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
                cookies.set("user", res.data);
                setTimeout(() => {
                    if (cookies.get("user")._id) {
                        window.location.href = window.location.href + "Data";
                        window.location.reload();
                    } else {
                        alert(cookies.get("user").messages);
                    }
                }, "1000");
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
                if (res.status === 202) {
                    alert(res.data.data);
                } else {
                    alert("等待管理員審核");

                    window.location.href = "/";
                }
            });
    } catch (e) {
        console.log(e);
    }
};
