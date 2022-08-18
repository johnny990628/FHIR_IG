import React from "react";
import CustomHeader from "../CustomHeader/index";
import { Layout } from "antd";
import Router from "../Router";
import CustomModal from "../CustomModal";

const PageLayout = () => {
  const { Header, Content } = Layout;

  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
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
