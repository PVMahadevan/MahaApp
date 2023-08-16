import styles from "./Row.module.sass";
import cn from "classnames";
import Checkbox from "../../../../components/Checkbox";
import Balance from "../../../../components/Balance";

const Row = ({
    item,
    value,
    onChange,
    activeTable,
    setActiveTable,
    activeId,
    setActiveId,
}) => {
    const handleClick = (id) => {
        setActiveTable(true);
        setActiveId(id);
    };

    return (
        <>
            <div
                className={cn(
                    styles.row,
                    { [styles.selected]: activeId === item.id },
                    { [styles.active]: activeTable }
                )}
            >
                <div className={styles.col}>
                    <Checkbox
                        className={styles.checkbox}
                        value={value}
                        onChange={onChange}
                    />
                </div>
                <div className={styles.col}>
                    <div
                        className={styles.item}
                        onClick={() => handleClick(item.id)}
                    >
                        <div>
                          {item.name}
                        </div>
                    </div>
                </div>
                <div className={styles.col}>
                     <div>
                          {item.phoneNumber}
                        </div>
                </div>
                <div className={styles.col}>
                    <div className={cn("status-green-dark", styles.purchase)}>
                        {item.score}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Row;
