import React, { useState } from "react";
import styles from "./Candidates.module.sass";
import cn from "classnames";
import Users from "../MessageCenter/Users";
import Messages from "../MessageCenter/Messages";

const navigation = [
  {
    title: "Customers",
    icon: "profile-circle",
  },
  {
    title: "Everyone",
    icon: "lightning",
  },
];

const actions = [
  {
    title: "Mark as read",
    icon: "check",
    action: () => console.log("Mark as read"),
  },
  {
    title: "Delete message",
    icon: "trash",
    action: () => console.log("Delete message"),
  },
];

const parameters = [
  {
    title: "Customer since",
    content: "Sep 2021",
  },
  {
    title: "Purchased",
    content: "21 items",
  },
  {
    title: "Lifetime",
    content: "$1,235.00",
  },
];
const experience = [
    {
      id: 0,
      name: "Kathryn Murphy",
      avatar: "/images/content/avatar-1.jpg",
      score: "45",
      currentDesignation: 'Senior Product Designer',
      experience: "6yr",
      location: "Bangalore",
      phone: "+5324 34534 54",
      source: "LinkedIn",
      bio: "Passionate about crafting exceptional user experiences, I'm a Senior Product Designer with [X+] years of industry expertise. My journey in design has been marked by a relentless pursuit of innovation, marrying user-centered principles with strategic vision. With a keen eye for detail and a deep understanding of design systems, I've successfully delivered impactful solutions for [X] projects across diverse industries.",
      keySkills: ['User-Centered Design', 'Design Thinking', 'Interaction Design', 'Visual Design', 'Prototyping', 'Information Architecture', 'Usability Testing', 'Collaboration', 'Design Systems', 'User Research', 'Data-Driven Design', 'Project Management'],
      employement: [
        {
            id:0,
            designation: 'Senior Product Designer',
            companyName: 'XYZ company',
            jobType: 'Full-time',
            startDate: 'Apr 2021',
            endDate: '',
            role: 'Led the design of [X] successful product launches, resulting in [Y]% increase in user engagement and [Z]% improvement in user satisfaction.Collaborated closely with cross-functional teams to define user requirements, create wireframes, prototypes, and high-fidelity designs. Conducted user research and usability testing to gather insights, iterate on designs, and enhance the overall user experience.Played a key role in establishing and maintaining the companys design system, ensuring consistency and efficiency in design processes.Mentored and provided guidance to junior designers, fostering a culture of continuous learning and design excellence.',


        },
        {
            id:1,
            designation: 'Senior UI Designer',
            companyName: 'ABC company',
            jobType: 'Full-time',
            startDate: 'Apr 2021',
            endDate: '',
            role: 'Led the design of [X] successful product launches, resulting in [Y]% increase in user engagement and [Z]% improvement in user satisfaction.Collaborated closely with cross-functional teams to define user requirements, create wireframes, prototypes, and high-fidelity designs. Conducted user research and usability testing to gather insights, iterate on designs, and enhance the overall user experience.Played a key role in establishing and maintaining the companys design system, ensuring consistency and efficiency in design processes.Mentored and provided guidance to junior designers, fostering a culture of continuous learning and design excellence.',


        }
      ],
    },
  ];
  
const users = [
  {
    id: 0,
    name: "Jarret Waelchi",
    avatar: "/images/content/avatar-1.jpg",
    designation: "Senior Product Designer",
    score: "45",
    experience: "6yr",
    location: "Bangalore",
    new: true,
    online: false,
    detail: [experience[0]],
  },
  {
    id: 1,
    name: "Orval Casper",
    avatar: "/images/content/avatar-2.jpg",
    designation: "Senior Product Designer",
    score: "50",
    experience: "4yr",
    location: "Bangalore",
    new: false,
    online: true,
    detail: [experience[0]],
  },
  {
    id: 2,
    name: "Michel Emard",
    avatar: "/images/content/avatar-3.jpg",
    designation: "Senior Product Designer",
    score: "55",
    experience: "3yr",
    location: "Delhi",
    new: true,
    online: false,
    detail: [experience[0]],
  },
  {
    id: 3,
    name: "Reuben Ward",
    avatar: "/images/content/avatar-4.jpg",
    designation: "Senior Product Designer",
    score: "40",
    experience: "7yr",
    location: "Chennai",
    new: false,
    online: false,
    detail: [experience[0]],
  }
];



const Candidates = () => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <div className={cn(styles.wrapper, { [styles.active]: visible })}>






      <Users
       onSelectUser={(user) => {
        console.log("Selected user:", user);
        setSelectedUser(user);
      }}
        className={styles.users}
        navigation={navigation}
        items={users}
        setVisible={setVisible}
        search={search}
        setSearch={setSearch}
        onSubmit={() => handleSubmit()}
        // onSelectUser={(user) => setSelectedUser(user)} // Set selected user
      />
      
      <Messages
        className={styles.messages}
        visible={visible}
        setVisible={setVisible}
        actions={actions}
        parameters={parameters}
        messages={selectedUser ? selectedUser.detail : []} // Pass selected user's messages
      />
    </div>
  );
};

export default Candidates;
