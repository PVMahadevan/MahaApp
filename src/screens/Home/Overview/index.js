import React, { useState } from "react";
import cn from "classnames";
import styles from "./Overview.module.sass";
import Icon from "../../../components/Icon";
import Dropdown from "../../../components/Dropdown";
import { WithContext as ReactTags } from "react-tag-input";
import Tooltip from "../../../components/Tooltip";

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const optionsCategory = ["Select designation", "UI UX Designer", "Java Developer"];
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Overview = ({ className }) => {
  const [category, setCategory] = useState(optionsCategory[0]);
  const [tags, setTags] = useState([{ id: "Geometry", text: "Geometry" }]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTags([]);
  };

  const onTagUpdate = (i, newTag) => {
    const updatedTags = tags.slice();
    updatedTags.splice(i, 1, newTag);
    setTags(updatedTags);
  };

  return (
    <form className={cn(className, styles.form)} action="" >
  <Dropdown
          className={styles.field}
          label="Designation"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
          value={category}
          setValue={setCategory}
          options={optionsCategory}
        />
           <div className={styles.head}>
          <div className={styles.label}>
            Tags{" "}
            <Tooltip
              className={styles.tooltip}
              title="Maximum 100 characters. No HTML or emoji allowed"
              icon="info"
              place="right"
            />
          </div>
          <div className={styles.counter}>
            <span>1</span>/12 tags
          </div>
        </div>
        <div className={styles.tags}>
          <ReactTags
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            delimiters={delimiters}
            handleTagClick={handleTagClick}
            onClearAll={onClearAll}
            onTagUpdate={onTagUpdate}
            suggestions={[{ id: "1", text: "Geometry" }]}
            placeholder="Enter tags to describe your item"
            minQueryLength={2}
            maxLength={20}
            autofocus={false}
            allowDeleteFromEmptyInput={true}
            autocomplete={true}
            readOnly={false}
            allowUnique={true}
            allowDragDrop={true}
            inline={true}
            inputFieldPosition="inline"
            allowAdditionFromPaste={true}
            editable={true}
            clearAll={true}
            tags={tags}
          />
        </div>
    </form>
  );
};


export default Overview;
