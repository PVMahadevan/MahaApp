import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Icon from "../../../components/Icon";

const Item = ({ className, item }) => {
  const [visible, setVisible] = useState(false);
  const theObj = {__html:item.content};
  return (
    <div className={cn(styles.item, className, { [styles.active]: visible })}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        <div className={styles.title}>{item.title}</div>
        <div className={cn(styles.iconSection, { [styles.active]: visible })}>
        <button className={styles.iconBtn}>
          <Icon name="copy" size="24" />
        </button>
        <button className={styles.iconBtn}>
          <Icon name="trash" size="24" />
        </button>
        <button className={cn("button", styles.button, styles.filled, {})}>
          <Icon name="edit" size="24" /> Open in editor
        </button>
        </div>
        <Icon name="plus-circle"  className={cn(styles.trigger, { [styles.active]: visible })} size="24" />
      </div>
      <div className={styles.body} dangerouslySetInnerHTML={theObj}></div>
    </div>
  );
};

export default Item;
