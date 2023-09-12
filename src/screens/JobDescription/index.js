import React, { useState } from "react";
import cn from "classnames";
import styles from "./Jobdescription.module.sass";
import Icon from "../../components/Icon";
import Input from "../../components/TextInput";
import { WithContext as ReactTags } from "react-tag-input";
import TooltipGlodal from "../../components/TooltipGlodal";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import Candidates from "./Candidates";
import { jsPDF } from "jspdf";
import Slider from "react-slick";
import api from "../../services/api";
import { createJobDescription } from "../../services/job-description";



const KeyCodes = {
    comma: 188,
    enter: 13,
};
const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
    <button {...props}>{children}</button>
);

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const navigation = ["Results", "Candidates"];

const JobDescription = ({ className }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: (
            <SlickArrow>
                <Icon name="arrow-right" size="24" />
            </SlickArrow>
        ),
        prevArrow: (
            <SlickArrow>
                <Icon name="arrow-left" size="24" />
            </SlickArrow>
        ),
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };
    const [activeIndex, setActiveIndex] = useState(0);
    const [desig, setDesig] = useState();
    const [tags, setTags] = useState([]);
    const [apiResponse, setApiResponse] = useState(null);


    function handleDelete(i) {
        setTags(tags.filter((tag, index) => index !== i));
    }


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

    //Click to download the generated JD as text file


    const downloadJobDescription = () => {
        const blob = new Blob([apiResponse || ''], { type: 'text/plain' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'JobDescription.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const downloadJobDescriptionAsPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);

        // Ensure desig is a string or access the correct property of desig
        const designation = typeof desig === 'string' ? desig : desig.title;
        doc.text("Job Description:" + designation, 10, 10);

        doc.setFontSize(12);
        const wrappedText = doc.splitTextToSize(apiResponse, 180);
        doc.text(wrappedText, 10, 30); // Adjust the y-coordinate to space out the content
        doc.save('JobDescription.pdf');
    }


    //     const downloadJobDescriptionAsPDF = () => {
    //     const doc = new jsPDF();
    //     doc.setFontSize(16);
    //     doc.text({desig} + ":Job Description", 10, 10);

    //     doc.setFontSize(12);
    //     const wrappedText = doc.splitTextToSize(apiResponse, 180);
    //     doc.text(wrappedText, 10, 30); // Adjust the y-coordinate to space out the content
    //     doc.save('JobDescription.pdf');
    // };

    //Fetch API
    const fetchJobDescription = async () => {
        const [error, result] = await createJobDescription({
            role: desig,
            tags,
        });
        if (error) {
            console.error("Error fetching job description:", error);
            alert('Error while creating JD')
            return
        }
        setApiResponse(result.data);
    };

    return (

        <>
            <div className={styles.row}>
                <div className={styles.col}>
                    <Card
                        className={cn(styles.card, className)}
                        title="RoleForge JD"
                        classTitle="title-green"
                    >

                        <Input
                            className={styles.field}
                            label="Designation"
                            required
                            placeholder="Enter Role"
                            value={desig}
                            onChange={(e) => setDesig(e.target.value)}
                            maxLength={100}
                        />

                        <div className={styles.head}>
                            <div className={styles.label}>
                                Keywords{""}
                            </div>
                            <div className={styles.counter}>
                                <span> {tags.length}</span>/12 tags
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
                                placeholder="Enter Keyword Description"
                                required
                                minQueryLength={2}
                                maxLength={50}
                                autofocus={false}
                                allowDeleteFromEmptyInput={true}
                                autocomplete={true}
                                readOnly={false}
                                allowUnique={true}
                                allowDragDrop={true}
                                inline={true}
                                inputFieldPosition="bottom"
                                allowAdditionFromPaste={true}
                                editable={true}
                                clearAll={false}
                                tags={tags}
                            /> </div>


                        <button
                            type="submit"
                            className={cn("button", styles.button)}
                            onClick={fetchJobDescription}
                        >
                            <Icon name="magic-wand" size="22" />
                            Generate
                        </button>

                    </Card>
                </div>
                <div className={styles.col}>
                    <Card
                        className={cn(styles.card, className)}
                        title="Generated JD"
                        classTitle="title-red"
                    // head={
                    //     <>
                    //         <button
                    //             className={cn("button button-small mr-10", styles.button)}
                    //             onClick={downloadJobDescription}
                    //         >
                    //             <Icon name="edit" size="24" />
                    //             <span>Open in editor</span>
                    //         </button>
                    //         <button
                    //             className={cn("button button-small", styles.button)}
                    //             onClick={downloadJobDescriptionAsPDF}
                    //         >
                    //             <Icon name="upload" size="24" /> {/* Assuming you have a PDF icon */}
                    //             <span>Export as PDF</span>
                    //         </button>
                    //     </>


                    // }

                    >



                        <div className={styles.wrap}>

                            <>
                                <div className={cn(styles.results)}>
                                    <div className={styles.title}>
                                        Job Description: {desig}
                                    </div>
                                    <div className={styles.subTitle}>
                                        Position Overview:
                                    </div>
                                    <div className={styles.content}>
                                        {apiResponse}
                                    </div>

                                </div>



                            </>

                        </div>
                        <div className={styles.btnGroup}>
                            <button
                                className={cn("button-stroke button-small mr-10", styles.button)}
                                onClick={downloadJobDescription}
                            >
                                <Icon name="edit" size="24" />
                                <span>Regenerate</span>
                            </button>
                            <button
                                className={cn("button-stroke button-small mr-10", styles.button)}
                                onClick={downloadJobDescription}
                            >
                                <Icon name="check" size="24" />
                                <span>Save</span>
                            </button>

                            <button
                                className={cn("button button-small mr-10", styles.button)}
                                onClick={downloadJobDescription}
                            >
                                {/* <Icon name="edit" size="24" /> */}
                                <span>Publish</span>
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
            <Card className={cn(styles.card, 'mt-10')}>

                <Slider className="candidate-slider" {...settings}>
                    <div className={styles.flexRow}><img src="/images/content/product-pic-2.jpg" /> <div className={styles.score}><img src="/images/score.png" width="17" />87</div></div>
                    <div><img src="/images/content/product-pic-1.jpg" /></div>
                    <div><img src="/images/content/product-pic-3.jpg" /></div>
                    <div><img src="/images/content/product-pic-2.jpg" /></div>
                    <div><img src="/images/content/product-pic-1.jpg" /></div>
                    <div><img src="/images/content/product-pic-3.jpg" /></div>
                </Slider>

            </Card>
            <TooltipGlodal />
        </>
    );
};


export default JobDescription;
