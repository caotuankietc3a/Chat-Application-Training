import React from "react";
import styles from "./Header.module.css";
import {VscComment} from "react-icons/vsc";
import {FaCog} from "react-icons/fa";

const Header = (props) => {
   return (
      <header className={styles.msg_header}>
         <div className={styles.msg_header_title}>
            <span><VscComment />{props.room}</span>
         </div>
         <div className={styles.msg_header_options}>
            <span><FaCog /></span>
         </div>
      </header >
   );
}

export default Header;
