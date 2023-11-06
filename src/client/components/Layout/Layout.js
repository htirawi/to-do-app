import { Fragment } from "react";

import styles from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Footer from "../Footer/Footer";

const Layout = (props) => {


  return (
    <Fragment>
      <MainNavigation />
      <div className={styles.main}>{props.children}</div>

      <Footer />
    </Fragment>
  );
};
export default Layout;
