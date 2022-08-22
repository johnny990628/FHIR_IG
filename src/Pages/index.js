import {
    UserSwitchOutlined,
    DatabaseOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Data from "./Data";
import User from "./User";
import Login from "./Login";
import Register from "./Register";

const cookies = new Cookies();

const PageItem = [];

const DataList = {
    label: "資料集",
    icon: <DatabaseOutlined />,
    element: <Data />,
    path: "/Data",
};

const UserList = {
    label: "使用者管理",
    icon: <UserSwitchOutlined />,
    element: <User />,
    path: "/User",
};

const LoginList = {
    label: "登入",
    icon: <DatabaseOutlined />,
    element: <Login />,
    path: "/",
};

const LogoutList = {
    label: (
        <a
            onClick={() => {
                cookies.remove("user", { path: "/" });
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }}
        >
            登出
        </a>
    ),
    icon: <LogoutOutlined />,
    element: <></>,
    path: "/",
};

const RegisterList = {
    label: "註冊",
    icon: <DatabaseOutlined />,
    element: <Register />,
    path: "/Register",
};

if (cookies.get("user")) {
    console.log(cookies.get("user"));
    if (cookies.get("user").userType === "admin") {
        PageItem.push(DataList, UserList, LogoutList);
    } else if (cookies.get("user").userType === "normal") {
        PageItem.push(DataList, LogoutList);
    } else {
        PageItem.push(LoginList, RegisterList);
    }
} else {
    PageItem.push(LoginList, RegisterList);
}

export default PageItem;
