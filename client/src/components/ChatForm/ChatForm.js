import React from "react";
import styles from "./ChatForm.module.css";
import Header from "./Header/Header";
import Input from "./Input/Input";
import BodyBar from "./BodyBar/BodyBar";
import Card from '../UI/Card/Card';

const ChatForm = (props) => {
   return (
      <Card>
         <section className={styles.msg}>
            <Header room={props.room} />
            <BodyBar messages={props.messages} nameUser={props.nameUser} />
            <Input clickButtonHandler={props.clickButtonHandler} msgChangeHandler={props.msgChangeHandler} msgSendHandler={props.msgSendHandler} text={props.mes} />
         </section>
      </Card>
   );
}

export default ChatForm;
