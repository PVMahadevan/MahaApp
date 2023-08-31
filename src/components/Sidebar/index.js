import React, { useState } from "react";
import styles from "./Sidebar.module.sass";
import { Link, NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Dropdown from "./Dropdown";
import Help from "./Help";
import Image from "../Image";

const navigation = [
    // {
    //     title: "Job Description",
    //     icon: "home",
    //     url: "/",
    // },
    {
        title: "RoleForge JD",
        // slug: "roleforgejd",
        icon: "diamond",
        add: false,
        dropdown: [
            {
                title: "Job Description",
                url: "/roleforgejd/jd",
            },
            {
                title: "History",
                url: "/roleforgejd/history",
                counter: "4",
                colorCounter: "#B5E4CA",
            },
            {
                title: "Candidates",
                url: "/roleforgejd/candidates",
                counter: "120",
                colorCounter: "#B5E4CA",
            }
        ],
    },
    {
        title: "Interview360",
        icon: "multiselect",
        url: "/interview360",
    },
    // {
    //     title: "Interview360",
    //     slug: "customers",
    //     icon: "profile-circle",
    //     dropdown: [
    //         {
    //             title: "Overview",
    //             url: "/customers/overview",
    //         },
    //         {
    //             title: "Customer list",
    //             url: "/customers/customer-list",
    //         },
    //     ],
    // },
    // {
    //     title: "History",
    //     icon: "multiselect",
    //     url: "/history",
    // },
    // {
    //     title: "Income",
    //     slug: "income",
    //     icon: "pie-chart",
    //     dropdown: [
    //         {
    //             title: "Earning",
    //             url: "/income/earning",
    //         },
    //         {
    //             title: "Refunds",
    //             url: "/income/refunds",
    //         },
    //         {
    //             title: "Payouts",
    //             url: "/income/payouts",
    //         },
    //         {
    //             title: "Statements",
    //             url: "/income/statements",
    //         },
    //     ],
    // },
];

const Sidebar = ({ className, onClose }) => {
    const [visibleHelp, setVisibleHelp] = useState(false);
    const [visible, setVisible] = useState(false);

    const { pathname } = useLocation();

    return (
        <>
            <div
                className={cn(styles.sidebar, className, {
                    [styles.active]: visible,
                })}
            >
                <button className={styles.close} onClick={onClose}>
                    <Icon name="close" size="24" />
                </button>
                <Link className={styles.logo} to="/" onClick={onClose}>
                    <Image
                        className={styles.pic}
                        src="/images/logo.png"
                        srcDark="/images/logo-dark.png"
                        alt="Core"
                    />
                </Link>
                <div className={styles.menu}>
                    {navigation.map((x, index) =>
                        x.url ? (
                            <NavLink
                                className={cn(styles.item, {
                                    [styles.active]: pathname === x.url,
                                })}
                                to={x.url}
                                key={index}
                                onClick={onClose}
                            >
                                <Icon name={x.icon} size="24" />
                                {x.title}
                            </NavLink>
                        ) : (
                            <Dropdown
                                className={styles.dropdown}
                                visibleSidebar={visible}
                                setValue={setVisible}
                                key={index}
                                item={x}
                                onClose={onClose}
                            />
                        )
                    )}
                </div>
                <button
                    className={styles.toggle}
                    onClick={() => setVisible(!visible)}
                >
                    <Icon name="arrow-right" size="24" />
                    <Icon name="close" size="24" />
                </button>
                <div className={styles.foot}>
                    <button
                        className={styles.link}
                        // onClick={() => setVisibleHelp(true)}
                    >
                        {/* <Icon name="help" size="24" /> */}
                        About Us
                        
                    </button>
                    <button
                        className={styles.link}
                    >
                        Privacy Policy
                        
                    </button>
                    <button
                        className={styles.link}
                    >
                        Back to home
                        
                    </button>
                    <hr/>
                    <Theme className={styles.theme} visibleSidebar={visible} />
                </div>
            </div>
            <Help
                visible={visibleHelp}
                setVisible={setVisibleHelp}
                onClose={onClose}
            />
            <div
                className={cn(styles.overlay, { [styles.active]: visible })}
                onClick={() => setVisible(false)}
            ></div>
        </>
    );
};

export default Sidebar;
