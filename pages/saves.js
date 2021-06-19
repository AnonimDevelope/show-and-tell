import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as style from "../styles/saves.module.css";
import Layout from "../components/Layout/Layout";
import Container from "../components/Container/Container";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import { Empty, Typography } from "antd";
import { getHtmlFromContent } from "../functions/post";
import UnautheticatedPage from "../components/UnauthenticatedPage/UnautheticatedPage";
import Head from "next/head";
import SpinPage from "../components/SpinPage/SpinPage";
import useSWR from "swr";

const Saves = () => {
  const { data: saves, mutate } = useSWR("user/saves");

  const user = useSelector((state) => state.auth.user);

  const onRemoveFromSaves = (id) => {
    const newSaves = [...saves];
    const index = newSaves.findIndex((post) => post._id === id);
    newSaves.splice(index, 1);
    mutate(newSaves);
  };

  if (!user) {
    return (
      <>
        <Head>
          <title>Saves</title>
        </Head>
        <UnautheticatedPage />
      </>
    );
  }

  if (!saves) {
    return (
      <>
        <Head>
          <title>Saves</title>
        </Head>
        <SpinPage />
      </>
    );
  }

  if (saves && saves.length === 0) {
    return (
      <>
        <Head>
          <title>Saves</title>
        </Head>
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
            <Empty description="You don't have any saves" />
          </Container>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Saves</title>
      </Head>
      <Layout>
        <Container style={{ padding: "20px 15px", minHeight: "90vh" }}>
          <Typography.Title style={{ textAlign: "center" }} level={1}>
            Your saved posts
          </Typography.Title>
          <div className={style.band}>
            {saves
              .slice()
              .sort((a, b) => b.savedDate - a.savedDate)
              .map((post) => {
                return (
                  <ArticleCard
                    key={post._id}
                    postId={post._id}
                    style={{ marginBottom: 20 }}
                    title={post.title}
                    content={getHtmlFromContent(post.content)}
                    thumbnail={post.thumbnail}
                    author={post.author ? post.author.name : null}
                    authorId={post.authorId}
                    linkTo={"/posts/" + post.slug}
                    onRemoveFromSaves={() => onRemoveFromSaves(post._id)}
                  />
                );
              })}
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Saves;
