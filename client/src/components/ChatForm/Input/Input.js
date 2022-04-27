import React from "react";
import styles from "./Input.module.css";
import {RiMailSendLine} from 'react-icons/ri';

const Input = (props) => {
   const onClickButtonHandler = (e) => {
      props.clickButtonHandler();
      e.preventDefault();
   }

   return (
      <form className={styles.msg_input_form}>
         <textarea rows="1" placeholder="Enter your message..." onChange={props.msgChangeHandler} onKeyPress={props.msgSendHandler} value={props.text}></textarea>
         <button type="submit" onClick={onClickButtonHandler}><RiMailSendLine /></button>
      </form>
   );
}

export default Input;
