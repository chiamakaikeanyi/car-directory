import React from "react";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <a href="/">Car Directory</a>
    </header>
  );
};

export default Header;
