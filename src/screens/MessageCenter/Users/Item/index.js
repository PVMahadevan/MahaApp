import cn from "classnames";
import styles from "./Item.module.sass";


const Item = ({ item, setVisible, activeId, setActiveId,onSelectUser }) => {
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
                { [styles.active]: activeId === item.id }
            )}
            onClick={() => handleClick(item.id)}
        >
            <div className={styles.avatar}>
                <img src={item.avatar} alt="Avatar" />
            </div>
            <div className={styles.details}>
                <div className={styles.head}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.flex}>
                    <div className={styles.score}><img src="/images/score.png" width="17"/>{item.score}</div>
                    <div className={styles.score}><img src="/images/favourite.png" width="17"/></div>
                    </div>
                </div>
                <div
                    className={styles.designation}>{item.designation}</div>
                <div
                    className={styles.message}><span>{item.experience}</span>  .  <span>{item.location}</span></div>
            </div>
        </div>
    );
};

export default Item;
