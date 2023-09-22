import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Icon from "../../../components/Icon";
import { useNavigate } from "react-router";

const Item = ({ className, item }) => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = (e)=>{
    e.stopPropagation();
    e.preventDefault();
    navigate(`/roleforgejd/editor/${item._id}`)
  }

  return (
    <div className={cn(styles.item, className, { [styles.active]: visible })}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        <div className={styles.title}><b>Job Description: </b>{item.requirment?.toLocaleUpperCase()}</div>
        <div className={cn(styles.iconSection, { [styles.active]: visible })}>
        <button className={styles.iconBtn}>
          <Icon name="copy" size="24" />
        </button>
        <button className={styles.iconBtn}>
          <Icon name="trash" size="24" />
        </button>
        <button onClick={handleEditClick} className={cn("button", styles.button, styles.filled, {})}>
          <Icon name="edit" size="24" /> Open in editor
        </button>
        </div>
        <Icon name="plus-circle"  className={cn(styles.trigger, { [styles.active]: visible })} size="24" />
      </div>
      <div className={styles.body}>{item.jobDescription?.keywords?.join(',')}</div>
    </div>
  );
};

export default Item;
