import React from "react";
import cn from "classnames";
import styles from "./File.module.sass";
import Icon from "../Icon";
import Tooltip from "../Tooltip";

const File = ({ className, tooltip, title, handleFileUpload, selected }) => {
  return (
    <div className={cn(styles.file, className)}>
      {selected ? (
        <div className={styles.label}>
          {tooltip && (
            <Tooltip
              className={styles.tooltip}
              title={tooltip}
              icon="info"
              place="right"
            />
          )}
          <b>{selected?.name}</b>{" "} <i>File is selected. Please click Parse Resume to Continue</i>
        </div>
      ) :
        <div className={styles.wrap}>
          <input className={styles.input} onChange={handleFileUpload} type="file" />
          <div className={styles.box}>
            <Icon name="upload" size="24" />
            {title}
          </div>
        </div>}
    </div>
  );
};

export default File;
