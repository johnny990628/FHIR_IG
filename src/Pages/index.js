import {
    UserSwitchOutlined,
    DatabaseOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import Cookies from "universal-cookie";
import Data from "./Data";
import User from "./User";
import Login from "./Login";
import Register from "./Register";

const cookies = new Cookies();
console.log(cookies.get("user"));

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
    path: "/user",
};

const LoginList = {
    label: "登入",
    icon: <DatabaseOutlined />,
    element: <Login />,
    path: "/",
};

const LogoutList = {
    label: "登出",
    icon: <LogoutOutlined />,
    element: <></>,
    path: "/logout",
};

const RegisterList = {
    label: "註冊",
    icon: <DatabaseOutlined />,
    element: <Register />,
    path: "/Register",
};

if (cookies.get("user").userType === "admin") {
    PageItem.push(DataList,UserList,LogoutList);
} else if (cookies.get("user").userType === "normal") {
    PageItem.push(DataList,LogoutList);
} else {
    PageItem.push(LoginList, RegisterList);
}

export default PageItem;
