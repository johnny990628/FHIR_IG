import {
    UserSwitchOutlined,
    DatabaseOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import Data from "./Data";
import User from "./User";

export default [
    {
        label: "資料集",
        icon: <DatabaseOutlined />,
        element: <Data />,
        path: "/data",
    },
    {
        label: "使用者管理",
        icon: <UserSwitchOutlined />,
        element: <User />,
        path: "/user",
    },
    {
        label: "登出",
        icon: <LogoutOutlined />,
        element: <></>,
        path: "/logout",
    },
];
