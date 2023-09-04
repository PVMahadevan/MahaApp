import React, { useState } from "react";
import cn from "classnames";
import styles from "./Code.module.sass";
import Loader from "../../../components/Loader";
import TextInput from "../../../components/TextInput";
import Dropdown from "../../../components/Dropdown"
const intervals = ["Information Technology", "Healthcare", "Finance and Banking"];
const Code = () => {
  const [sorting, setSorting] = useState(intervals[0]);
  return (
    <div className={styles.code}>
      <div className={styles.body}>
        <div className={styles.info}>
          Tell us more about your company. Your answers will help us understand your core values, industry, and branding.
        </div>
        <div className={styles.fieldset}>
          <TextInput
            className={styles.field}
            name="core mission"
            type="text"
            placeholder="Core Mission & Vision of the Company"
            required
            icon=""
          />
          <div className={styles.field}>
            <textarea
              className={styles.textarea}
              name="post"
              placeholder="Describe your company culture in few words"
            />
          </div>
          <Dropdown
          className={styles.dropdown}
          classDropdownHead={styles.dropdownHead}
          value={sorting}
          setValue={setSorting}
          options={intervals}
          small
        />
        </div>
        <div className={styles.errorNote}>
          The code you entered is incorrect.
        </div>
        <button className={cn("button", styles.button)}>
          <Loader className={styles.loader} white />
          <span>Continue</span>
        </button>
        <div className={styles.note}>
          This site is protected by reCAPTCHA and the Google Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default Code;
