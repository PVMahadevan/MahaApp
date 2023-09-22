import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Interview360.module.sass";
import File from "../../components/File";
import Card from "../../components/Card";
import Icon from "../../components/Icon";
import { Link } from "react-router-dom";
import { saveResume, uploadResume } from "../../services/candidates";
import toast from "react-hot-toast";
import Editor from "./Editor";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Input from "../../components/TextInput";

const extensions = [
    StarterKit,
]
const content = '<p>Resume will Load once Parse</p>'

const navigationData = [
    {
        label: "Technical proficiency",
        content: {
            title: "Technical Proficiency",
            subTitle: "Position Overview:",
            details: "Content for the Technical Proficiency section...",
        },
    },
    {
        label: "Continuous learning",
        content: {
            title: "Continuous Learning",
            subTitle: "Position Overview:",
            details: "Content for the Continuous Learning section...",
        },
    },
    {
        label: "C&I",
        content: {
            title: "C&I",
            subTitle: "Position Overview:",
            details: "Content for the C&I section...",
        },
    },
    {
        label: "Leadership",
        content: {
            title: "Leadership",
            subTitle: "Position Overview:",
            details: "Content for the Leadership section...",
        },
    },
    {
        label: "Problem solving",
        content: {
            title: "Problem Solving",
            subTitle: "Position Overview:",
            details: "Content for the Problem Solving section...",
        },
    },
    {
        label: "Communication",
        content: {
            title: "Communication",
            subTitle: "Position Overview:",
            details: "Content for the Communication section...",
        },
    },
    {
        label: "Adaptability & flexibility",
        content: {
            title: "Adaptability & Flexibility",
            subTitle: "Position Overview:",
            details: "Content for the Adaptability & Flexibility section...",
        },
    },
    // Add more sections as needed...
];
const Interview360 = ({ className }) => {
    const editor = useEditor({
        extensions,
        content: content,
    })
    const [metaData, setMetaData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedFile, setSelectedFile] = useState();
    const [parsedData, setParsedData] = useState('')
    const [showParsedContainer, setShowParsedContainer] = useState(true);
  const [loading, setLoading] = useState(false)
  const handleParseClick = async () => {
        // setShowParsedContainer(!showParsedContainer);
        setLoading(true);
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );

        // Details of the uploaded file
        console.log(selectedFile);

        // Request made to the backend api
        // Send formData object
        const [error, result] = await uploadResume(formData)
        if (error) {
            console.log(error)
            toast.error('File upload failed')
            return;
        }
        console.log({ result })
        const content = result?.data?.html || result?.data?.text;
        try {
            setMetaData(JSON.parse(result?.data?.metaData))
        } catch (error) {
            console.error(error)
        }
        setParsedData(content)
        editor?.commands?.setContent(content)
        setShowParsedContainer(true);
        setLoading(false);
        toast.success('File parsed successfully')

    };
    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };

    const handleClear = () => {
        setSelectedFile(null)
    }

    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
    }



    const handleSaveClick = async () => {
        console.log('save resume')
        setLoading(true);
        const [error, result] = await saveResume({
            content: editor.getHTML(),
            ...metaData,
        })
        setLoading(false);
        if (error) {
            console.log(error)
            toast.error('Failed to Save Resume')
            return;
        }
        toast.success('Resume Saved')
    }

    return (
        <div className={styles.row}>
            {showParsedContainer && (
                <div className={styles.left}>
                    <Card
                        className={cn(styles.card, className)}
                        title="Upload resume"
                        classTitle="title-green"
                    >
                        <File
                            selected={selectedFile}
                            className={styles.field}
                            title="Upload or drop resume"
                            tooltip="Maximum 1MB file. PDF & DOC are allowed"
                            handleFileUpload={handleFileUpload}
                        />
                        {selectedFile &&
                            <button
                                type="button"
                                className={cn("button-stroke-red", styles.button)}
                                onClick={handleClear}
                                disabled={!selectedFile}
                            >
                                Clear Selection
                            </button>}
                        <button
                            type="button"
                            className={cn("button", styles.button)}
                            onClick={handleParseClick}
                            disabled={!selectedFile}
                        >
                            <Icon name="magic-wand" size="22" />
                            Parse resume
                        </button>
                    </Card>
                </div>
            )}
            <div className={styles.right}>
                {showParsedContainer ? parsedData && 
                (
                    
                    <Card
                        className={cn(styles.card, className)}
                        title="Parsed details"
                        classTitle="title-blue"
                    >
                        <Input
                            className={styles.field}
                            label="Candidate Name"
                            required
                            placeholder="Enter Candidate Name"
                            value={metaData?.name}
                            name='name'
                            onChange={(e) => {
                                setMetaData({
                                    ...metaData, 
                                    [e.target.name]: e.target.value,
                                })
                            }}
                            maxLength={40}
                        />
                          <Input
                            className={styles.field}
                            label="Designation"
                            required
                            placeholder="Enter Designation"
                            value={metaData?.designation}
                            name='designation'
                            onChange={(e) => {
                                setMetaData({
                                    ...metaData, 
                                    [e.target.name]: e.target.value,
                                })
                            }}
                            maxLength={40}
                        />
                          <Input
                            className={styles.field}
                            label="Candidate Email"
                            required
                            placeholder="Enter Candidate Email"
                            value={metaData?.email}
                            name='name'
                            onChange={(e) => {
                                setMetaData({
                                    ...metaData, 
                                    [e.target.name]: e.target.value,
                                })
                            }}
                            maxLength={40}
                        />
                          <Input
                            className={styles.field}
                            label="Candidate Phone Number"
                            required
                            placeholder="Enter Candidate Phone"
                            value={metaData?.phone}
                            name='phone'
                            onChange={(e) => {
                                setMetaData({
                                    ...metaData, 
                                    [e.target.name]: e.target.value,
                                })
                            }}
                            maxLength={40}
                        />
                          <Input
                            className={styles.field}
                            label="Years of Experience"
                            required
                            placeholder="Enter Years of Experience"
                            value={metaData?.experience}
                            name='experience'
                            onChange={(e) => {
                                setMetaData({
                                    ...metaData, 
                                    [e.target.name]: e.target.value,
                                })
                            }}
                            maxLength={40}
                        />
                        <button
                            disabled={!metaData || !parsedData}
                            type="button"
                            className={cn("button", styles.button)}
                            onClick={handleSaveClick}
                        >
                            Save Candidate
                        </button>
                        <hr></hr>
                        <Editor editor={editor} />
                    </Card>
                ) : 
                (
                    <Card
                        className={cn(styles.card, className)}
                        title="Questions"
                        classTitle="title-blue"
                        head={
                            <Link
                                className={cn("button-stroke button-small", styles.button)}
                                onClick={() => {
                                    setShowParsedContainer(false)
                                }}
                            >
                                <Icon name="arrow-left" size="24" />
                                <span>Back</span>
                            </Link>
                        }
                    >
                        <div className={styles.questioncontainer}>
                            <div className={styles.nav}>
                                {navigationData.map((section, index) => (
                                    <button
                                        key={index}
                                        className={cn(styles.link, {
                                            [styles.active]: index === activeIndex,
                                        })}
                                        onClick={() => handleButtonClick(index)}
                                    >
                                        {section.label}
                                    </button>
                                ))}
                            </div>

                            <div className={cn(styles.results)}>
                                <div className={styles.title}>
                                    {navigationData[activeIndex].content.title}
                                </div>
                                <div className={styles.subTitle}>
                                    {navigationData[activeIndex].content.subTitle}
                                </div>
                                <div className={styles.content}>
                                    {navigationData[activeIndex].content.details}
                                </div>
                            </div>
                        </div>
                    </Card>
                )}



            </div>
        </div >

    );
};

export default Interview360;