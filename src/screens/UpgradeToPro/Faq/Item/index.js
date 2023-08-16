import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Icon from "../../../../components/Icon";

const Item = ({ className, item }) => {
  const [visible, setVisible] = useState(false);
  const theObj = {__html:item.content};
  return (
    <div className={cn(styles.item, className, { [styles.active]: visible })}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        <div className={styles.title}>{item.title}</div>
        <Icon name="plus-circle" size="24" />
      </div>
      <div className={styles.body} dangerouslySetInnerHTML={theObj}></div>
    </div>
  );
};

export default Item;
