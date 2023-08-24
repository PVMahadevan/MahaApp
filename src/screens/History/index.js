import React, { useState } from "react";
import cn from "classnames";
import styles from "./History.module.sass";
import Item from "./Item";
import Card from "../../components/Card";

// data
import { items } from "../../mocks/jd-history"

const History = ({ className }) => {
  const options = [];
  items.map((x) => options.push(x.title));

  const [category, setCategory] = useState(options[0]);

  return (
    <div className={styles.row}>
    <div className={styles.col}>
        <Card
            className={cn(styles.card, className)}
            title="History"
            classTitle="title-green"
        >

        <div className={styles.list}>
          {items.map((x, index) => (
              <Item className={styles.item} item={x} key={index} />
            ))}
        </div>
        </Card>
    </div>
</div>
  );
};

export default History;