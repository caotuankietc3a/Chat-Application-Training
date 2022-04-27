import React from "react";
import styles from "./Message.module.css";

function formatDate(date) {
   const h = "0" + date.getHours();
   const m = "0" + date.getMinutes();

   return `${h.slice(-2)}:${m.slice(-2)}`;
}

const Message = (props) => {
   return (
      <div className={`${styles.msg_comment} ${props.className}`}>
         <div className={styles.msg_img}></div>
         <div className={styles.msg_bubble}>
            <div className={styles.msg_info}>
               <div className={styles.msg_info_name}>{props.name}</div>
               <div className={styles.msg_info_time}>{formatDate(new Date())}</div>
            </div>
            <div className={styles.msg_text}>{props.text}</div>
         </div>
      </div>
   );
}

export default Message;
