import React from "react";
import Container from "../Container/Container";
import Spin from "../Spin/Spin";
import Layout from "../Layout/Layout";

const SpinPage = () => {
  return (
    <Layout>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: "90vh",
        }}
      >
        <Spin size={30} />
      </Container>
    </Layout>
  );
};

export default SpinPage;
