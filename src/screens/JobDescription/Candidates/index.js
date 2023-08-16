import React, { useState } from "react";
import cn from "classnames";
import styles from "./Candidates.module.sass";
import Card from "../../../components/Card";
import Form from "../../../components/Form";
import Icon from "../../../components/Icon";
import Market from "../../Released/Market";
import Product from "../../../components/Product";
import Loader from "../../../components/Loader";
import Panel from "../../Released/Panel";
import Table from "../../CustomerList/Table";
import Checkbox from "../../../components/Checkbox";
import Row from "./Row";
import Filters from "../../../components/Filters";
import Settings from "../../Shop/Settings";

// data
import { candidates } from "../../../mocks/candidates";

const sorting = ["list", "grid"];

const Candidates = ({ className, activeTable, setActiveTable }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChange = (id) => {
    if (selectedFilters.includes(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const [chooseAll, setСhooseAll] = useState(false);
  const [activeId, setActiveId] = useState(candidates[0].id);


  return (
    <>
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="Candidates List"
        classTitle={cn("title-purple", styles.title)}
        head={
          <>
            <Form
              className={styles.form}
              value={search}
              setValue={setSearch}
              onSubmit={() => handleSubmit()}
              placeholder="Search product"
              type="text"
              name="search"
              icon="search"
            />
            
            <div className={styles.sorting}>
             
                <Filters
              className={styles.filters}
              title="Showing 10 of 24 customer"
            >
              <Settings />
            </Filters>
            </div>
          </>
        }
      >
        <div className={styles.wrapper}>
              <div className={styles.list}>
                <div className={styles.w100}>
                <div className={cn(styles.table)}>
                  <div className={cn(styles.row, { [styles.active]: activeTable })}>
                    <div className={styles.col}>
                      <Checkbox
                        className={styles.checkbox}
                        value={chooseAll}
                        onChange={() => setСhooseAll(!chooseAll)}
                      />
                    </div>
                    <div className={styles.col}>Name</div>
                    <div className={styles.col}>Phone Number</div>
                    <div className={styles.col}>Score</div>
                  </div>
                  {candidates.map((x, index) => (
                    <Row
                      item={x}
                      key={index}
                      activeTable={activeTable}
                      setActiveTable={setActiveTable}
                      activeId={activeId}
                      setActiveId={setActiveId}
                      value={selectedFilters.includes(x.id)}
                      onChange={() => handleChange(x.id)}
                    />
                  ))}
                </div>
                <div className={styles.foot}>
                  <button className={cn("button-stroke button-small", styles.button)}>
                    <Loader className={styles.loader} />
                    <span>Load more</span>
                  </button>
                </div>
              </div>
              </div>
             
        </div>
      </Card>
      <Panel />
    </>
  );
};

export default Candidates;
