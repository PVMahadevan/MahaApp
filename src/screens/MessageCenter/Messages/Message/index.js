import styles from "./Message.module.sass";
import cn from "classnames";

const Message = ({ item }) => {
    return (
        <div className={styles.message}>
            <div className={styles.profile}>
                <div className={styles.avatar}>
                    <img src={item.avatar} alt="Avatar" />
                </div>
                <div className={`${styles.flexColumn} ${styles.fullw} ${styles.gap4}`}>
                    <div className={`${styles.flexRow} ${styles.content}`}>
                        <div className={styles.flexColumn}>
                            <div>{item.name}</div>
                            <div>{item.currentDesignation}</div>
                        </div>
                        <div className={`${styles.flexRow} ${styles.metric}`}>
                            <div className={styles.score}><img src="/images/score.png" width="17" />{item.score}</div>
                            <div className={styles.score}><img src="/images/favourite.png" width="17" /></div>
                            <button className={cn("button", styles.button, {})} >Download CV</button>
                        </div>

                    </div>
                    <div className={styles.borderHorizontal}></div>
                    <div>
                    <div className={`${styles.flexRow} ${styles.flxspbw}`}>
                        <div className={styles.metricItem}><img src="/images/experience.png" width="23"/> {item.experience}</div>
                        <div className={styles.metricItem}><img src="/images/phone.png" width="23"/> {item.phone}</div>
                    </div>
                    <div className={`${styles.flexRow} ${styles.flxspbw}`}>
                        <div className={styles.metricItem}><img src="/images/location.png" width="23"/> {item.location}</div>
                        <div className={styles.metricItem}><img src="/images/linkedin.png" width="23"/> {item.source}</div>
                    </div>
                    </div>
                </div>
            </div>
            <div className={styles.details}>
                <div>Bio</div>
                <div>{item.bio}</div>
                <div>Key skills</div>
                <div>
                    {item.keySkills.map((x, index) => (
                        <div className={styles.parameter} key={index}>
                            <span>{x}</span>
                        </div>
                    ))}
                </div>
                <div>Empoyment</div>
                <div>
                    {item.employement.map((x, index) => (
                        <div className={styles.parameter} key={index}>
                            <div>
                                <div>{x.designation}</div>
                                <div>{x.companyName}</div>
                                <div>{x.jobType}</div>
                                <div>{x.startDate} to Present {x.endDate}</div>
                                <div>{x.role}</div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Message;
