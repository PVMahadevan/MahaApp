import React, { useState } from "react";
import cn from "classnames";
import styles from "./Interview360.module.sass";
import File from "../../components/File";
import Card from "../../components/Card";
import Icon from "../../components/Icon";
import { Link } from "react-router-dom";

const navigation = ["Technical proficiency", "Continuous learning", "C&I", "Leadership", "Problem solving", "Communication", "Adaptability & flexibility"];
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
    const [activeIndex, setActiveIndex] = useState(0);
    const [showParsedContainer, setShowParsedContainer] = useState(true);
    const handleGenerateQuestions = () => {
        setShowParsedContainer(!showParsedContainer);
    };
    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };
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
                        className={styles.field}
                        title="Upload or drop resume"
                        label=""
                        tooltip="Maximum 1MB file. PDF & DOC are allowed"
                    />
                    <button
                        type="submit"
                        className={cn("button", styles.button)}
                        onClick={handleGenerateQuestions}
                    >
                        <Icon name="magic-wand" size="22" />
                        Parse resume
                    </button>
                </Card>
            </div>
              )}
            <div className={styles.right}>
                {showParsedContainer && (
                    <Card
                        className={cn(styles.card, className)}
                        title="Parsed details"
                        classTitle="title-blue"
                    >

                        <div className={styles.parsedcontainer}>
                            <div className={cn(styles.results)}>
                                <div className={styles.title}>
                                    Experience
                                </div>
                                <div className={styles.subTitle}>
                                    Company - 01:
                                </div>
                                <div className={styles.content}>
                                    We are seeking a creative and skilled Content Writer to join our team. As a Content Writer, you will play a key role in crafting compelling and engaging content for various platforms, including websites, blogs, social media, and more.
                                </div>
                            </div>

                            <div className={cn(styles.results)}>
                                <div className={styles.title}>
                                    Skills
                                </div>
                                <div className={styles.content}>
                                    - Content Writing
                                    <br />
                                    - Social Media Management
                                    <br />
                                    - SEO Optimization
                                </div>
                            </div>

                            <div className={cn(styles.results)}>
                                <div className={styles.title}>
                                    Education
                                </div>
                                <div className={styles.subTitle}>
                                    University XYZ
                                </div>
                                <div className={styles.content}>
                                    Bachelor of Arts in English Literature
                                    <br />
                                    Graduated: May 20XX
                                </div>
                            </div>

                            <div className={cn(styles.results)}>
                                <div className={styles.title}>
                                    Certifications
                                </div>
                                <div className={styles.subTitle}>
                                    Content Marketing Certification
                                </div>
                                <div className={styles.content}>
                                    Issued by: Marketing Institute
                                    <br />
                                    Date: March 20XX
                                </div>
                                <div className={styles.subTitle}>
                                    SEO Specialist Certification
                                </div>
                                <div className={styles.content}>
                                    Issued by: SEO Academy
                                    <br />
                                    Date: June 20XX
                                </div>
                            </div>

                            <div className={cn(styles.results)}>
                                <div className={styles.title}>
                                    Projects
                                </div>
                                <div className={styles.subTitle}>
                                    Blog Redesign
                                </div>
                                <div className={styles.content}>
                                    - Led a team of designers and developers to redesign the company blog, resulting in a 30% increase in user engagement.
                                    <br />
                                    - Implemented SEO best practices to improve blog visibility and organic traffic.
                                </div>
                                <div className={styles.subTitle}>
                                    Social Media Campaign
                                </div>
                                <div className={styles.content}>
                                    - Developed and executed a successful social media campaign that increased brand awareness and engagement by 40%.
                                    <br />
                                    - Created compelling content and managed social media accounts.
                                </div>
                            </div>

                            <div className={cn(styles.results)}>
                                <div className={styles.title}>
                                    Bio
                                </div>
                                <div className={styles.content}>
                                    I am a highly motivated and creative Content Writer with over 5 years of experience in creating engaging content for various digital platforms. I have a strong passion for storytelling and a proven track record of driving organic traffic through SEO-optimized content. My ability to adapt to different writing styles and effectively communicate complex ideas sets me apart in the field.
                                </div>
                            </div>
                        </div>


                    </Card>
                )}
                {!showParsedContainer && (
                    <Card
                        className={cn(styles.card, className)}
                        title="Questions"
                        classTitle="title-blue"
                        head={
                            <Link
                                className={cn("button-stroke button-small", styles.button)}
                                onClick={handleGenerateQuestions}
                            >
                                <Icon name="arrow-left" size="24" />
                                <span>Back</span>
                            </Link>
                        }
                    >
                        <div className={styles.questioncontainer}>

                            {/* <div className={styles.nav}>
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
                                               Technical Proficiency
                                            </div>
                                            <div className={styles.subTitle}>
                                                Position Overview:
                                            </div>
                                            <div className={styles.content}>

                                            </div>

                                        </div>



                                    </>
                                )}
                                {activeIndex === 1 && (
                                    <>
                                        <div className={cn(styles.results)}>


                                        </div>



                                    </>
                                )}
                            </div> */}
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