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
    return axios.put(`${process.env.REACT_APP_BASE_URL}/api/user/${user._id}`, {
        id: user._id,
        _id: user._id,
        username: user.username,
        password: user.password,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        status: user.status,
        _updaterId: user._updaterId, //admin name
        _upTime: date,
    });
};


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
                message.error("該成員擁有IG，無法刪除");
                console.log(error.request);
            });
    } catch (error) {
        console.log(error);
    }
};
