import { useEffect } from "react";
import "../styles/globals.css";
import "../styles/sideMenu.scss";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../store/actions/index";
import { wrapper } from "../store/store";
import { SWRConfig } from "swr";
import Head from "next/head";
import { mutate } from "swr";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Show&Tell</title>
      </Head>

      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(
              process.env.NEXT_PUBLIC_DOMAIN_API +
                resource +
                "?secret_token=" +
                localStorage.getItem("token"),
              init
            ).then((res) => res.json()),
        }}
      >
        <ReduxAccess>
          <Component {...pageProps} />
        </ReduxAccess>
      </SWRConfig>
    </>
  );
}

export default wrapper.withRedux(MyApp);

const ReduxAccess = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      mutate(
        `user/${user._id}`,
        fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN_API}user/${
            user._id
          }?secret_token=${localStorage.getItem("token")}`
        ).then((res) => res.json())
      );
      mutate(
        "user/saves",
        fetch(
          `${
            process.env.NEXT_PUBLIC_DOMAIN_API
          }user/saves?secret_token=${localStorage.getItem("token")}`
        ).then((res) => res.json())
      );
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN_API}user?secret_token=${token}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          if (data.error) {
            return;
          }
          dispatch(authenticate(data));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  return children;
};
