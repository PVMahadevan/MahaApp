import React, { useState } from "react";
import cn from "classnames";
import styles from "./Settings.module.sass";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import Checkbox from "../../../components/Checkbox";
import Icon from "../../../components/Icon";
import { Range, getTrackBackground } from "react-range";
import useDarkMode from "use-dark-mode";

const options = ["Featured", "Popular", "New"];
const optionsRating = ["91 and above", "81 to 90", "71 to 80", "61 to 70", "below 60"];
const filters = [
  "All products",
  "UI Kit",
  "Illustration",
  "Wireframe kit",
  "Icons",
];

const STEP = 1;
const MIN = 0;
const MAX = 120;

const Settings = () => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState(options[0]);
  const [rating, setRating] = useState(optionsRating[3]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [values, setValues] = useState([32, 80]);
  const darkMode = useDarkMode(false);

  const handleSubmit = (e) => {
    alert();
  };

  const handleChange = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== filter));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, filter]);
    }
  };

  return (
    <div className={styles.settings}>
    
      <div className={styles.group}>
        <div className={styles.item}>
          <Dropdown
            className={styles.dropdown}
            classDropdownHead={styles.dropdownHead}
            classDropdownLabel={styles.label}
            value={sorting}
            setValue={setSorting}
            options={options}
            label="Sort by"
          />
        </div>
        <div className={styles.item}>
        <Form
        className={styles.form}
        value={search}
        setValue={setSearch}
        onSubmit={() => handleSubmit()}
        placeholder="Search for products"
        type="text"
        name="search"
        icon="search"
      />
          <div className={styles.label}>Showing</div>
          <div className={styles.list}>
            {filters.map((x, index) => (
              <Checkbox
                className={styles.checkbox}
                content={x}
                value={selectedFilters.includes(x)}
                onChange={() => handleChange(x)}
                key={index}
                reverse
              />
            ))}
          </div>
        </div>
      
        <div className={styles.item}>
          <div className={styles.box}>
            <Dropdown
              className={styles.dropdown}
              classDropdownLabel={styles.label}
              classDropdownHead={styles.dropdownHead}
              value={rating}
              setValue={setRating}
              options={optionsRating}
              label="Score"
              upBody
            />
            <Icon name="arrows-up-down" size="24" />
          </div>
        </div>
        <div className={styles.btns}>
          <button className={cn("button-stroke", styles.button)}>Reset</button>
          <button className={cn("button", styles.button)}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
