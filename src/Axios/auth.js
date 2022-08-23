import Request from "./index";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
export const apiLogin = (data) => Request.post("/login", data);
export const apiRegister = (data) => Request.post("/api/user", data);

// export const apiRegister = (data) => {
//   try {
//     axios
//       .post(`${process.env.REACT_APP_BASE_URL}/api/user`, data)
//       .then((res) => {
//         console.log(res);
//         if (res.status === 202) {
//           alert(res.data.data);
//         } else {
//           alert("等待管理員審核");

//           window.location.href = "/";
//         }
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };
