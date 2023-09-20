import cn from "classnames";
import styles from "./Item.module.sass";


const Item = ({ item, setVisible, activeId, setActiveId, onSelectUser }) => {
    const handleClick = (id) => {
        setVisible(true);
        setActiveId(id);
        onSelectUser(item);
    };


    return (

        <div
            className={cn(
                styles.item,
                { [styles.new]: item.new },
                { [styles.online]: item.online },
                { [styles.active]: activeId === item?._id }
            )}
            onClick={() => handleClick(item?.id)}
        >
            <div className={styles.avatar}>
                <img src={item?.avatar || '/images/content/avatar-1.jpg'} alt="Avatar" />
            </div>
            <div className={styles.details}>
                <div className={styles.head}>
                    <div className={styles.name}>{item?.name}</div>
                    <div className={styles.flex}>
                        <div className={styles.score}><img src="/images/score.png" width="17" />{item?.score || 0}</div>
                        <div className={styles.score}><img src="/images/favourite.png" width="17" /></div>
                    </div>
                </div>
                <div
                    className={styles.designation}>{item?.designation || 'Software Person'}</div>
                <div
                    className={styles.message}><span>{item?.experience || "1 Year"}</span>  .  <span>{item?.location || 'India'}</span></div>
            </div>
        </div>
    );
};

export default Item;
