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
import api from "../../services/custom/api";
import { createJobDescription, saveJobDescription } from "../../services/jobs";
import toast from "react-hot-toast";
import { getMatchingResume } from "../../services/candidates";
import Users from "../MessageCenter/Users";
import Loader, { LoaderModal } from "../../components/Loader";
import Modal from "../../components/Modal";
import { Button, message, Steps, theme } from 'antd';
import { disableBodyScroll, clearAllBodyScrollLocks, enableBodyScroll } from "body-scroll-lock";



const KeyCodes = {
    comma: 188,
    enter: 13,
};
const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
    <button {...props}>{children}</button>
);

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const navigation = ["Results", "Candidates"];

const steps = [
    {
        title: 'RoleForge JD',
        content: 'First-content',
    },
    {
        title: 'Generated JD',
        content: 'Second-content',
    },
    {
        title: 'Matching Candidates',
        content: 'Last-content',
    },
];

const JobDescription = ({ className }) => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));


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
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([]);
    const [desig, setDesig] = useState();
    const [tags, setTags] = useState([]);
    const [apiResponse, setApiResponse] = useState(null);

    console.log(apiResponse)
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
        // link.href = href;
        // link.download = 'JobDescription.txt';
        // document.body.appendChild(link);
        // link.click();
        document.body.removeChild(link);
        setCurrent(current - 1);
    };
    const target = document.querySelector("body");
    const saveJobDesc = async () => {
        setLoading(true)
        const [error, result] = await saveJobDescription({
            role: desig,
            tags,
            jobDescription: apiResponse
        });
        setLoading(false)
        if (error) {
            console.error("Saved fetching job description:", error);
            toast.error('Errored while Saving Job Description')
            enableBodyScroll(target);
            return
        }
        toast.success('Saved Job Description successfully');
        enableBodyScroll(target);
    }


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

    const viewMatchingCandidates = async () => {
        setLoading(true)
        const [error, result] = await getMatchingResume({
            jobDescription: apiResponse
        })
        console.log(error, result);
        setUsers(result);
        setLoading(false)
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
        setCurrent(current + 1);
        setLoading(true)
        const [error, result] = await createJobDescription({
            role: desig,
            tags,
        });
        setLoading(false)
        if (error) {
            console.error("Error fetching job description:", error);
            toast.error('Errored while creating Job Description')
            return
        }
        toast.success('Created Job Description successfully')
        setApiResponse(result.data);
    };

    return (

        <>
        <div  className={cn(styles.row, 'mb-40')}>
        <Steps current={current} items={items} />
        </div>
        <div className={styles.row}>
            <>
       
        {current == 0 &&(
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
                     disabled={!tags.length || !desig}
                     className={cn("button", styles.button)}
                     onClick={fetchJobDescription}
                 >
                     <Icon name="magic-wand" size="22" />
                     Generate
                 </button>

             </Card>
         </div>
        )
}
        {current == 1 &&(
 <div className={styles.col}>
 {apiResponse && <Card
     className={cn(styles.card, className)}
     title="Generated JD"
     classTitle="title-red"

 >



     <div className={styles.wrap}>

         <>
             <div className={cn(styles.results)}>
                 <div className={styles.title}>
                     Job Description: {desig} {apiResponse?.keywords}
                 </div>
                 <div className={styles.subTitle}>
                     Roles And Responsibilities
                 </div>
                 <div className={styles.content}>
                     {apiResponse?.rolesAndResponsibilities?.map(item => <p>{item}</p>)}
                 </div>
                 <div className={styles.subTitle}>
                     Qualifications
                 </div>
                 <div className={styles.content}>
                     {apiResponse?.qualifications?.map(item => <p>{item}</p>)}
                 </div>
                 <div className={styles.subTitle}>
                     Benefits Package
                 </div>
                 <div className={styles.content}>
                     {apiResponse?.benefitsPackage?.map(item => <p>{item}</p>)}
                 </div>
                 <div className={styles.subTitle}>
                     Experience
                 </div>
                 <div className={styles.content}>
                     {apiResponse?.experience?.map(item => <p>{item}</p>)}
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
             onClick={saveJobDesc}
         >
             <Icon name="check" size="24" />
             <span>Save</span>
         </button>

         <button
             className={cn("button-stroke button-small mr-10", styles.button)}
             onClick={viewMatchingCandidates}
         >
             <Icon name="check" size="24" />
             <span>View Matching Candidates</span>
         </button>

         <button
             className={cn("button button-small mr-10", styles.button)}
             onClick={downloadJobDescription}
         >
             {/* <Icon name="edit" size="24" /> */}
             <span>Publish</span>
         </button>
     </div>
 </Card>}
</div>
        )}
        {current == 2 && (
              <Card className={cn(styles.card, 'mt-10')}>
              {users?.length > 0 && <Users
                  onSelectUser={(user) => {
                      console.log("Selected user:", user);
                  }}
                  className={styles.users}
                  navigation={navigation}
                  items={users}
                  setVisible={() => { }}
                  search={''}
                  setSearch={() => { }}
                  onSubmit={() => { }}
              />}
             

          </Card>
        )}

        
                {/* <div >{steps[current].content}</div> */}
              
                </>
        </div>
        
            <div className={styles.row}>
               
                {/* <div className={styles.col}>
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
                            disabled={!tags.length || !desig}
                            className={cn("button", styles.button)}
                            onClick={fetchJobDescription}
                        >
                            <Icon name="magic-wand" size="22" />
                            Generate
                        </button>

                    </Card>
                </div> */}
                <LoaderModal visible={loading} />
                {/* <div className={styles.col}>
                    {apiResponse && <Card
                        className={cn(styles.card, className)}
                        title="Generated JD"
                        classTitle="title-red"

                    >



                        <div className={styles.wrap}>

                            <>
                                <div className={cn(styles.results)}>
                                    <div className={styles.title}>
                                        Job Description: {desig} {apiResponse?.keywords}
                                    </div>
                                    <div className={styles.subTitle}>
                                        Roles And Responsibilities
                                    </div>
                                    <div className={styles.content}>
                                        {apiResponse?.rolesAndResponsibilities?.map(item => <p>{item}</p>)}
                                    </div>
                                    <div className={styles.subTitle}>
                                        Qualifications
                                    </div>
                                    <div className={styles.content}>
                                        {apiResponse?.qualifications?.map(item => <p>{item}</p>)}
                                    </div>
                                    <div className={styles.subTitle}>
                                        Benefits Package
                                    </div>
                                    <div className={styles.content}>
                                        {apiResponse?.benefitsPackage?.map(item => <p>{item}</p>)}
                                    </div>
                                    <div className={styles.subTitle}>
                                        Experience
                                    </div>
                                    <div className={styles.content}>
                                        {apiResponse?.experience?.map(item => <p>{item}</p>)}
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
                                onClick={saveJobDesc}
                            >
                                <Icon name="check" size="24" />
                                <span>Save</span>
                            </button>

                            <button
                                className={cn("button-stroke button-small mr-10", styles.button)}
                                onClick={viewMatchingCandidates}
                            >
                                <Icon name="check" size="24" />
                                <span>View Matching Candidates</span>
                            </button>

                            <button
                                className={cn("button button-small mr-10", styles.button)}
                                onClick={downloadJobDescription}
                            >
                                <span>Publish</span>
                            </button>
                        </div>
                    </Card>}
                </div> */}
            </div>
            <div style={{ marginTop: 24 }} className={styles.row}>
                    {current < steps.length - 1 && (
                        <Button type="primary"  disabled={!tags.length || !desig} onClick={fetchJobDescription}>
                           <Icon name="magic-wand" size="14" /> Generate
                        </Button>
                    //      <button
                    //      type="submit"
                    //      disabled={!tags.length || !desig}
                    //      className={cn("button", styles.button)}
                    //      onClick={fetchJobDescription}
                    //  >
                    //      <Icon name="magic-wand" size="22" />
                    //      Generate
                    //  </button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
                
          
            <TooltipGlodal />
        </>
    );
};


export default JobDescription;
