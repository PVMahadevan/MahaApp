import React from "react";
import cn from "classnames";
import styles from "./Loader.module.sass";
import Modal from "../Modal";

const Loader = ({ className, white }) => {
  return (
    <div
      className={cn(styles.loader, className, {
        [styles.loaderWhite]: white,
      })}
    ></div>
  );
};

export const LoaderModal = ({ visible }) => {
  return (visible && <Modal
    visible
    modalStyle={{
      width: 80,
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    hideClose
  >
    <Loader className={styles.loader} />
  </Modal>)
}

export default Loader;
