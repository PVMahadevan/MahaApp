import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Interview360.module.sass";
import File from "../../components/File";
import Card from "../../components/Card";
import Icon from "../../components/Icon";
import { Link } from "react-router-dom";
import { getResumeQuestions, saveResume, uploadResume } from "../../services/candidates";
import toast from "react-hot-toast";
import Editor from "./Editor";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Input from "../../components/TextInput";
import { LoaderModal } from "../../components/Loader";

const extensions = [
    StarterKit,
]
const content = '<p>Resume will Load once Parse</p>'

const navigationData = [
    {
        label: "Technical proficiency",
        key: 'techincalProficiency',
        content: {
            title: "Technical Proficiency",
            subTitle: "Questions:",
            details: "Content for the Technical Proficiency section...",
        },
    },
    {
        label: "Continuous learning",
        key: 'continousLearning',
        content: {
            title: "Continuous Learning",
            subTitle: "Questions:",
            details: "Content for the Continuous Learning section...",
        },
    },
    {
        label: "C&I",
        key: 'cicd',
        content: {
            title: "C&I",
            subTitle: "Questions:",
            details: "Content for the C&I section...",
        },
    },
    {
        label: "Leadership",
        key: 'leadership',
        content: {
            title: "Leadership",
            subTitle: "Questions:",
            details: "Content for the Leadership section...",
        },
    },
    {
        label: "Problem solving",
        key: 'problemSolving',
        content: {
            title: "Problem Solving",
            subTitle: "Questions:",
            details: "Content for the Problem Solving section...",
        },
    },
    {
        label: "Communication",
        key: 'communication',
        content: {
            title: "Communication",
            subTitle: "Questions:",
            details: "Content for the Communication section...",
        },
    },
    {
        label: "Adaptability & flexibility",
        key: 'adaptablityAndFlexiblity',
        content: {
            title: "Adaptability & Flexibility",
            subTitle: "Questions:",
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
    const [availableNavigationData, setAvailableNavigationData ] = useState(navigationData);
     const [metaData, setMetaData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedFile, setSelectedFile] = useState();
    const [parsedData, setParsedData] = useState('')
    const [questions, setQuestions] = useState(null)
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

    const handlePrepeareQuestions = async () => {
        console.log('save resume')
        setLoading(true);
        const [error, result] = await getResumeQuestions({
            resume: editor.getHTML(),
            ...metaData,
        })
        setLoading(false);
        if (error) {
            console.log(error)
            toast.error('Failed to Create Questions')
            return;
        }
        console.log(result);
        setQuestions(result?.data);
        setAvailableNavigationData(navigationData
            // ?.filter((section)=>{
            // return result?.data?.[section?.key]?.length > 0;
            // })
        )
        toast.success('Questions created')
    }

    console.log({availableNavigationData, activeIndex, })

    const selected = availableNavigationData[activeIndex];

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
            <LoaderModal visible={loading} />

            <div className={styles.right}>
                {questions && <Card
                    className={cn(styles.card, className)}
                    title="Questions"
                    classTitle="title-blue"
                >
                    <div className={styles.questioncontainer}>
                        <div className={styles.nav}>
                            {availableNavigationData.map((section, index) => (
                                <button
                                    key={index}
                                    className={cn(styles.link, {
                                        [styles.active]: index === activeIndex,
                                    })}
                                    onClick={() => {
                                        // if(!questions?.[section?.key]?.length){
                                        //     return toast.error('No questions under this topic')
                                        // }
                                        handleButtonClick(index);
                                    }}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </div>

                        <div className={cn(styles.results)}>
                            <div className={styles.title}>
                                {selected?.content?.title}
                            </div>
                            <div className={styles.subTitle}>
                                {selected?.content?.subTitle}
                            </div>
                            <div className={styles.content}>
                                <ol>
                                   {Array.isArray(questions?.[selected?.key]) ? questions?.[selected?.key]?.map((question=>(
                                     <li>{question}</li>
                                   ))) : <li>{questions?.[selected?.key] || '###'}</li>}
                                </ol>
                            </div>
                        </div>
                    </div>
                </Card>}
                {showParsedContainer && parsedData &&
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
                            <button
                                disabled={!metaData || !parsedData}
                                type="button"
                                className={cn("button", styles.button)}
                                onClick={handlePrepeareQuestions}
                            >
                                Prepare Questions
                            </button>
                            <hr></hr>
                            <Editor editor={editor} />
                        </Card>
                    )}

            </div>
        </div >

    );
};

export default Interview360;