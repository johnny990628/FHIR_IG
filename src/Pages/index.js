import {
  UserSwitchOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  ExportOutlined,
} from "@ant-design/icons";

import Data from "./Data";
import User from "./User";
import Login from "./Login";
import Register from "./Register";

// const PageItem = [
//   {
//     label: "資料集",
//     icon: <DatabaseOutlined />,
//     element: <Data />,
//     path: "/Data",
//   },
//   {
//     label: "使用者管理",
//     icon: <UserSwitchOutlined />,
//     element: <User />,
//     path: "/User",
//   },
//   {
//     label: "登入",
//     icon: <DatabaseOutlined />,
//     element: <Login />,
//     path: "/",
//   },
// ];
const DataList = {
  label: "資料集",
  icon: <DatabaseOutlined />,
  element: <Data />,
  path: "/data",
  key: "/data",
};

const UserList = {
  label: "使用者管理",
  icon: <UserSwitchOutlined />,
  element: <User />,
  path: "/user",
  key: "/user",
};

const LoginList = {
  label: "登入",
  icon: <LogoutOutlined />,
  element: <Login />,
  path: "/login",
  key: "/login",
};

const LogoutList = {
  label: "登出",
  icon: <ExportOutlined />,
  element: <></>,
  path: "/logout",
  key: "/logout",
};
const RegisterList = {
  label: "註冊",
  icon: <ExportOutlined />,
  element: <Register />,
  path: "/register",
  key: "/register",
};

export const adminPages = [DataList, UserList, LogoutList];
export const userPages = [DataList, LogoutList];
export const notAuthPages = [DataList, LoginList, RegisterList];

export const routePages = [DataList, UserList, LoginList, RegisterList];

// const LogoutList = {
//   label: (
//     <a
//       onClick={() => {
//         cookies.remove("user", { path: "/" });
//         setTimeout(() => {
//           window.location.reload();
//         }, 500);
//       }}
//     >
//       登出
//     </a>
//   ),
//   icon: <LogoutOutlined />,
//   element: <></>,
//   path: "/",
// };

// const RegisterList = {
//   label: "註冊",
//   icon: <DatabaseOutlined />,
//   element: <Register />,
//   path: "/Register",
// };

// if (cookies.get("user")) {
//   console.log(cookies.get("user"));
//   if (cookies.get("user").userType === "admin") {
//     PageItem.push(DataList, UserList, LogoutList);
//   } else if (cookies.get("user").userType === "normal") {
//     PageItem.push(DataList, LogoutList);
//   } else {
//     PageItem.push(LoginList, RegisterList);
//   }
// } else {
//   PageItem.push(LoginList, RegisterList);
// }

// export default PageItem;
