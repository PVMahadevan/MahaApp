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



const KeyCodes = {
    comma: 188,
    enter: 13,
};


const delimiters = [KeyCodes.comma, KeyCodes.enter];
const navigation = ["Results", "Candidates"];

const JobDescription = ({ className }) => {
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
        doc.text( "Job Description:" + designation , 10, 10);
    
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
        try {
            const response = await fetch("http://216.48.187.144:8000/v1/chat/completions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: "bud-v0.2",
                    token: "4096",
                    messages: [
                        {
                            role: "user",
                            content: `Instruction: The generated content should have a bit of details about Accubits in the beginning , Instruction: The task is to create a job description that includes Roles & Responsibilities, Experience Requirement, Benefits & Package, Qualifications, and also define KPIs for the respective role ${desig}. Instruction: You should also consider ${JSON.stringify(tags)} while creating Job Description. Instruction: Also, Generate a few industry standard keywords for the mentioned role ${desig}.`,
                        }
                    ]
                }),
            });

            const data = await response.json();
            setApiResponse(data.choices[0].message.content);
            console.log("API response:", data);
        } catch (error) {
            console.error("Error fetching job description:", error);
        }
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
                            />



                        </div>


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
                        title="Results"
                        classTitle="title-red"
                        head={
                            <>
                                <button
                                    className={cn("button button-small", styles.button)}
                                    onClick={downloadJobDescription}
                                >
                                    <Icon name="edit" size="24" />
                                    <span>Open in editor</span>
                                </button>
                                <button
                                    className={cn("button button-small", styles.button)}
                                    onClick={downloadJobDescriptionAsPDF}
                                >
                                    <Icon name="file-pdf" size="24" /> {/* Assuming you have a PDF icon */}
                                    <span>Export as PDF</span>
                                </button>
                            </>


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
                            )}
                            {activeIndex === 1 && (
                                <>
                                    <Candidates />
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
