import React, { useState } from "react";
import cn from "classnames";
import styles from "./Users.module.sass";
import Icon from "../../../components/Icon";
import Form from "../../../components/Form";
import Item from "./Item";

const Users = ({
  className,
  items,
  navigation,
  setVisible,
  onSubmit,
  search,
  setSearch,
  onSelectUser
}) => {
  console.log("Users component rendering"); // Add this line
  const [activeId, setActiveId] = useState(items[0].id);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn(className, styles.users)}>
     
      {/* <div className={styles.list}>
        {items.map((x, index) => (
          <Item
            item={x}
            activeId={activeId}
            setActiveId={setActiveId}
            setVisible={setVisible}
            key={index}
          />
        ))}
      </div> */}
        <div className={styles.list}>
        {items.map((x, index) => (
          <Item
            item={x}
            activeId={activeId}
            setActiveId={setActiveId}
            setVisible={setVisible}
            onSelectUser={onSelectUser} // Pass the onSelectUser function
            key={index}
          />
        ))}
      </div>
      <Form
        className={styles.form}
        value={search}
        setValue={setSearch}
        onSubmit={onSubmit}
        placeholder="Search message"
        type="text"
        name="search"
        icon="search"
      />
    </div>
  );
};

export default Users;
