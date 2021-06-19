import { useState, useEffect } from "react";
import * as style from "../styles/index.module.css";
import Layout from "../components/Layout/Layout";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import Container from "../components/Container/Container";
import SpinPage from "../components/SpinPage/SpinPage";
import { getTextFromContent } from "../functions/post";
import { getAllPosts } from "../functions/post";
import useSWR from "swr";
import Head from "next/head";

export default function Home({ data }) {
  const [width, setWidth] = useState(1366);
  const isBrowser = typeof window !== "undefined";
  const { data: posts, mutate } = useSWR("posts", {
    initialData: data,
  });

  useEffect(() => {
    if (data) mutate();
  }, [data, mutate]);

  useEffect(() => {
    if (isBrowser) {
      setWidth(window.innerWidth);
    }
  }, [isBrowser]);

  if (!posts) return <SpinPage />;

  return (
    <>
      <Head>
        <title>Show&Tell</title>
      </Head>
      <Layout>
        <div className={style.page}>
          <Container>
            <div className={style.band}>
              {posts.map((post, index) => {
                return (
                  <ArticleCard
                    key={post._id}
                    postId={post._id}
                    style={{ marginBottom: 20 }}
                    title={post.title}
                    content={getTextFromContent(post.content)}
                    thumbnail={post.thumbnail}
                    author={post.author ? post.author.name : null}
                    authorId={post.authorId}
                    linkTo={"/posts/" + post.slug}
                    big={index === 0 && width > 980}
                  />
                );
              })}
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
}

Home.getInitialProps = async ({ req }) => {
  if (!!req) {
    const posts = await getAllPosts();

    return { data: posts };
  }
  return {};
};
