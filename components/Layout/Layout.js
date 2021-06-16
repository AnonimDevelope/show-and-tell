import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideMenu from "../SideMenu/SideMenu";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ display: "flex", flexWrap: "nowrap" }}>
        <SideMenu />
        <div style={{ width: "100%" }}>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
