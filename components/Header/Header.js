import { memo } from "react";
import * as style from "./Header.module.css";
import Container from "../Container/Container";
import SignInModal from "../SignInModal/SignInModal";
import { useSelector, useDispatch } from "react-redux";
import {
  setModalVisibility,
  collapseMobileToggle,
} from "../../store/actions/index";
import Link from "next/link";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { MdMenu } from "@react-icons/all-files/md/MdMenu";
import Headroom from "react-headroom";
import Image from "next/image";

const Header = () => {
  const dispatch = useDispatch();
  const isLoginVisible = useSelector((state) => state.auth.isModalVisible);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <Headroom
        disable={typeof window !== "undefined" && window.innerWidth > 768}
      >
        <div className={style.header}>
          <Container>
            <div className={style.flexWrapper}>
              {user && (
                <MdMenu
                  onClick={() => dispatch(collapseMobileToggle())}
                  className={style.menuIcon}
                  size={35}
                />
              )}
              <Link href="/">
                <a>
                  <Image priority src="/logo.png" width={100} height={60} />
                </a>
              </Link>
              {user ? (
                <Link href={`/user/${user._id}`}>
                  <Avatar
                    size={50}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#5A5472", cursor: "pointer" }}
                    src={user.avatar}
                  />
                </Link>
              ) : (
                <Button
                  onClick={() => dispatch(setModalVisibility(true))}
                  type="primary"
                  className={style.signInButton}
                >
                  Sign In
                </Button>
              )}
            </div>
          </Container>
        </div>
      </Headroom>
      <SignInModal
        isVisible={isLoginVisible && !user}
        onClose={() => dispatch(setModalVisibility(false))}
      />
    </>
  );
};

export default memo(Header);
