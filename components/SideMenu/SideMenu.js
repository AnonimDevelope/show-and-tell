import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { MdTurnedInNot } from "@react-icons/all-files/md/MdTurnedInNot";
import { MdHistory } from "@react-icons/all-files/md/MdHistory";
import { MdNoteAdd } from "@react-icons/all-files/md/MdNoteAdd";
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import {
  toggleCollapse,
  logOut,
  collapseMobileToggle,
} from "../../store/actions/index";
import { useRouter } from "next/router";

const SideMenu = () => {
  const dispatch = useDispatch();
  const isBrowser = typeof window !== "undefined";
  const router = useRouter();
  const isCollapsed = useSelector((state) => state.menu.isCollapsed);
  const isToggled = useSelector((state) => state.menu.isToggled);
  const user = useSelector((state) => state.auth.user);
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    if (isBrowser) {
      setIsMobile(window.innerWidth < 768);
    }
  }, [isBrowser]);

  let sidebarStyle = {
    position: "sticky",
    top: -1,
    height: "calc( 100vh - 75px )",
  };

  if (isMobile) {
    sidebarStyle = { top: 0 };
  }

  if (!user) {
    sidebarStyle = {
      position: "sticky",
      top: -1,
      height: "calc( 100vh - 75px )",
      width: 0,
      minWidth: 0,
    };
  }

  let collapsed = isCollapsed;

  if (isMobile) {
    collapsed = false;
  }

  return (
    <div style={{ backgroundColor: "#394648" }}>
      <ProSidebar
        style={sidebarStyle}
        collapsed={collapsed}
        breakPoint="md"
        toggled={isToggled}
        onToggle={() => dispatch(collapseMobileToggle())}
      >
        <SidebarHeader
          style={{ display: "flex", alignItems: "center", paddingLeft: 20 }}
        >
          <MdKeyboardArrowLeft
            className={
              !isCollapsed || isMobile
                ? "sidebarCollapse"
                : "sidebarCollapse active"
            }
            size={35}
            onClick={() =>
              isMobile
                ? dispatch(collapseMobileToggle())
                : dispatch(toggleCollapse())
            }
          />
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem
              onClick={() => {
                router.push("/user/" + user._id);
                dispatch(collapseMobileToggle());
              }}
              icon={<BiUser size={20} />}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/editor");
                dispatch(collapseMobileToggle());
              }}
              icon={<MdNoteAdd size={20} />}
            >
              Write new article
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/saves");
                dispatch(collapseMobileToggle());
              }}
              icon={<MdTurnedInNot size={20} />}
            >
              Saves
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/history");
                dispatch(collapseMobileToggle());
              }}
              icon={<MdHistory size={20} />}
            >
              History
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem
              onClick={() => {
                dispatch(logOut());
                dispatch(collapseMobileToggle());
              }}
              icon={<BiLogOut size={20} />}
            >
              Log Out
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
};

export default SideMenu;
