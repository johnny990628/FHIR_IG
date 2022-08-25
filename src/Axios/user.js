import axios from "axios";
import { message } from "antd";
axios.defaults.withCredentials = true;

export const getUsers = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/user`
        ); // /api/user
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export const getUser = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/user/:${id}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const putUser = (user) => {
    var date = new Date();
    axios
        .put(`${process.env.REACT_APP_BASE_URL}/api/user/${user._id}`, {
            id: user._id,
            _id: user._id,
            username: user.username,
            password: user.password,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType,
            status: user.status,
            _createTime: user._createTime,
            _updaterId: user._updaterId, //admin name
            _upTime: date,
        })
        .then((response) => {
            message.success("修改成功");
            return response;
        })
        .catch((error) => {
            message.error("登入憑證已過期，請重新登入");
            delCookie("user");
            return error.request;
        });
};

//取cookies
function getCookie(name) {
    let arr = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    );
    if (arr != null) return unescape(arr[2]);
    return null;
}
//刪除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

export const deleteUser = async (id) => {
    try {
        axios
            .delete(`${process.env.REACT_APP_BASE_URL}/api/user/${id}`, {
                _id: id,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.request);
            });
    } catch (error) {
        console.log(error);
    }
};
