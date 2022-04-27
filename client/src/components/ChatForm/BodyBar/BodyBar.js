import React from "react";
import styles from "./BodyBar.module.css";
import Message from './Message';
import msgCss from './Message.module.css';
import ScrollToBottom from 'react-scroll-to-bottom';

const BodyBar = (props) => {
   return (
      <ScrollToBottom className={styles.msg_chat}>
         {props.messages.map((mes, i) => {
            if (mes.user === props.nameUser || !mes.user === "admin") {
               return <Message key={i} className={msgCss.msg_comment_right} name={mes.user} text={mes.text} />
            }
            return <Message key={i} className={msgCss.msg_comment_left} name={mes.user} text={mes.text} />
         })}
      </ScrollToBottom>
   );
}

export default BodyBar;
