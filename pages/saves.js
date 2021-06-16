import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as style from "../styles/saves.module.css";
import Layout from "../components/Layout/Layout";
import Container from "../components/Container/Container";
import Spin from "../components/Spin/Spin";
import ArticleCard from "../components/ArticleCard/ArticleCard";
import { Empty, Typography, Button, message } from "antd";
import { setModalVisibility } from "../store/actions/index";
import { getTextFromContent } from "../functions/post";
import { getUserSaves } from "../functions/user";

const Saves = () => {
  const [saves, setSaves] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserSaves();

        if (data.error) {
          message.error("Something went wrong! Try again later");
          setIsLoading(false);
          return;
        }

        setSaves(data);
        setIsLoading(false);
      } catch (error) {
        message.error("Something went wrong! Try again later");
        setIsLoading(false);
      }
    })();
  }, []);

  const onRemoveFromSaves = (id) => {
    const newSaves = [...saves];
    const index = newSaves.findIndex((post) => post._id === id);
    newSaves.splice(index, 1);
    setSaves(newSaves);
  };

  if (!user) {
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
  }

  if (isLoading) {
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
  }

  if (saves && saves.length === 0) {
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
          <Empty description="You don't have any saves" />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container style={{ padding: "20px 15px" }}>
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
                  content={getTextFromContent(post.content)}
                  thumbnail={post.thumbnail}
                  author={post.author ? post.author.name : null}
                  linkTo={"/posts/" + post.slug}
                  onRemoveFromSaves={() => onRemoveFromSaves(post._id)}
                />
              );
            })}
        </div>
      </Container>
    </Layout>
  );
};

export default Saves;
