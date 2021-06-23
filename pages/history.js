import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import Container from "../components/Container/Container";
import { Empty, Table, Button, Popconfirm, message } from "antd";
import Link from "next/link";
import { ClearOutlined, DeleteOutlined } from "@ant-design/icons";
import { getUserHistory, clearUserHistory } from "../functions/user";
import Head from "next/head";
import SpinPage from "../components/SpinPage/SpinPage";
import UnauthenticatedPage from "../components/UnauthenticatedPage/UnauthenticatedPage";

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getHistory = async () => {
      try {
        const data = await getUserHistory();

        if (data.error) {
          message.error("Something went wrong! Try again later");
          setIsLoading(false);
          return;
        }

        setHistory(data);
        setIsLoading(false);
      } catch (error) {
        message.error("Something went wrong! Try again later");
        setIsLoading(false);
      }
    };

    if (user) getHistory();
  }, [user]);

  const clearHistory = async () => {
    try {
      setTableLoading(true);

      const data = await clearUserHistory(
        selectedRowKeys.length !== 0
          ? JSON.stringify({ items: [...selectedRowKeys] })
          : JSON.stringify({ items: null })
      );

      if (data.error) {
        message.error("Something went wrong! Try again later");
        setTableLoading(false);
        return;
      }

      setHistory(data);
      setTableLoading(false);
    } catch (error) {
      message.error("Something went wrong! Try again later");
      setTableLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, item) => <Link href={`/posts/${item.slug}`}>{text}</Link>,
    },
    {
      title: "Author",
      dataIndex: "author",
      render: (text, item) => (
        <Link href={`/user/${item.authorId}`}>{text}</Link>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
    getCheckboxProps: (record) => ({
      title: record.title,
    }),
  };

  if (!user) {
    return (
      <>
        <Head>
          <title>History</title>
        </Head>
        <UnauthenticatedPage />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Head>
          <title>History</title>
        </Head>
        <SpinPage />
      </>
    );
  }

  if (history.length === 0) {
    return (
      <>
        <Head>
          <title>History</title>
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
            <Empty description="History is clear" />
          </Container>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <Layout>
        <Container style={{ paddingTop: 25, minHeight: "90vh" }}>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            loading={tableLoading}
            columns={columns}
            dataSource={history}
            footer={() => (
              <div style={{ display: "flex", justifyContent: "center" }}>
                {selectedRowKeys.length === 0 ? (
                  <Popconfirm
                    title="Are you sure to clear history?"
                    onConfirm={clearHistory}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button size="large" type="ghost" icon={<ClearOutlined />}>
                      Clear history
                    </Button>
                  </Popconfirm>
                ) : (
                  <Popconfirm
                    title="Are you sure to delete?"
                    onConfirm={clearHistory}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button size="large" type="ghost" icon={<DeleteOutlined />}>
                      Delete selected
                    </Button>
                  </Popconfirm>
                )}
              </div>
            )}
          />
        </Container>
      </Layout>
    </>
  );
};

export default History;
