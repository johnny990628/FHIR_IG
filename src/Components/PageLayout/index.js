import React, { useEffect } from "react";
import { Layout } from "antd";

import CustomHeader from "../CustomHeader/index";
import Router from "../Router";
import CustomModal from "../CustomModal";
import { useDispatch } from "react-redux";
import { auth, logout } from "../../Redux/Slices/Auth";
import { useCookies } from "react-cookie";

const PageLayout = () => {
  const { Header, Content } = Layout;
  const dispatch = useDispatch();
  const [cookies] = useCookies(["user"]);
  useEffect(() => {
    cookies.user
      ? dispatch(
          auth({
            user: cookies.user,
            isAdmin: cookies.user.userType === "admin",
            isLogin: true,
          })
        )
      : dispatch(logout());
  }, [cookies.user]);

  return (
    <Layout style={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
      <Header style={{ padding: 0 }}>
        <CustomHeader />
      </Header>
      <Content>
        <Router />
      </Content>
      <CustomModal />
    </Layout>
  );
};

export default PageLayout;
