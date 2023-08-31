import React, { useState } from "react";
import cn from "classnames";
import styles from "./Jobdescription.module.sass";
import Icon from "../../components/Icon";
import Dropdown from "../../components/Dropdown";
import { WithContext as ReactTags } from "react-tag-input";
import Tooltip from "../../components/Tooltip";
import TooltipGlodal from "../../components/TooltipGlodal";
import Card from "../../components/Card";
import { Link } from "react-router-dom";

const KeyCodes = {
    comma: 188,
    enter: 13,
};
const optionsCategory = ["Select designation", "UI UX Designer", "Java Developer"];
const delimiters = [KeyCodes.comma, KeyCodes.enter];
const navigation = ["Results", "Candidates"];

const JobDescription = ({ className }) => {
    const [activeIndex, setActiveIndex] = useState(0);
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

        <>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Card
                        className={cn(styles.card, className)}
                        title="Job Description"
                        classTitle="title-green"
                    >
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
                                    clearAll={false}
                                    tags={tags}
                                />
                            </div>
                            <button
                                className={cn("button", styles.button, {})} >
                                <Icon name="magic-wand" size="22" />
                                Generate
                            </button>
                        </form>
                    </Card>
                </div>
                <div className={styles.col}>
                    <Card
                        className={cn(styles.card, className)}
                        title="Results"
                        classTitle="title-red"
                        head={
                            <Link
                                className={cn("button button-small", styles.button)}
                                to="/products/dashboard"
                            >
                                <Icon name="edit" size="24" />
                                <span>Open in editor</span>
                            </Link>
                        }
                    >
                        <div className={styles.nav}>
                            {navigation.map((x, index) => (
                                <button
                                    className={cn(styles.link, {
                                        [styles.active]: index === activeIndex,
                                    })}
                                    onClick={() => setActiveIndex(index)}
                                    key={index}
                                >
                                    {x}
                                </button>
                            ))}
                        </div>
                        <div className={styles.wrap}>
                            {activeIndex === 0 && (
                                <>
                                    <div className={cn(styles.results)}>
                                        <div className={styles.title}>
                                            Job Description: UI UX Designer
                                        </div>
                                        <div className={styles.subTitle}>
                                            Position Overview:
                                        </div>
                                        <div className={styles.content}>
                                            We are seeking a creative and skilled Content Writer to join our team. As a Content Writer, you will play a key role in crafting compelling and engaging content for various platforms, including websites, blogs, social media, and more.
                                        </div>
                                        <div className={styles.subTitle}>
                                            Position Overview:
                                        </div>
                                        <div className={styles.content}>
                                            We are seeking a creative and skilled Content Writer to join our team. As a Content Writer, you will play a key role in crafting compelling and engaging content for various platforms, including websites, blogs, social media, and more.
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeIndex === 1 && (
                                <>
                                    <div>Candidates</div>
                                </>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
            <TooltipGlodal />
        </>
    );
};


export default JobDescription;
