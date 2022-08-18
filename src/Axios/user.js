import axios from "axios";
const config = require("../config.json");

const apiURL = config.apiURL;
axios.defaults.withCredentials = true;

export const getUsers = async () => {
    try {
        const response = await axios.get(`${apiURL}/user`); // /api/user
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${apiURL}/user/:${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const putUser = async (user) => {
    var date = new Date();
    try {
        axios
            .put(`${apiURL}/user/${user._id}`, {
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
                console.log(response);
            })
            .catch((error) => {
                console.log(user);
                console.log(error.request);
            });
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (id) => {
    try {
        axios
            .delete(`${apiURL}/user/${id}`, {
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
