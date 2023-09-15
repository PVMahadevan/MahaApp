import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./History.module.sass";
import Item from "./Item";
import Card from "../../components/Card";
import { getJobDescriptionHistory } from '../../services/jobs'

const History = ({ className }) => {
  const options = [];

  const [items, setItems] = useState([]);

  const init = async () => {
    const [error, result] = await getJobDescriptionHistory();
    setItems(result?.data)
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <Card
          className={cn(styles.card, className)}
          title="History"
          classTitle="title-green"
        >

          <div className={styles.list}>
            {items?.map((x, index) => (
              <Item className={styles.item} item={x} key={index} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default History;