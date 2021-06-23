import React from "react";
import Layout from "../Layout/Layout";
import { Button } from "antd";
import Container from "../Container/Container";
import { useDispatch } from "react-redux";
import { setModalVisibility } from "../../store/actions";

const UnauthenticatedPage = () => {
  const dispatch = useDispatch();

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
        <Button
          style={{ backgroundColor: "#6f6cec" }}
          onClick={() => dispatch(setModalVisibility(true))}
          type="primary"
        >
          Sign In
        </Button>
      </Container>
    </Layout>
  );
};

export default UnauthenticatedPage;
