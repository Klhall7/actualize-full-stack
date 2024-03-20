import styles from "../styles/ContentContainer.module.css";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ContentContainer = () => {
    return (
        <>
            <section className={styles.contentContainer}>
                {/* add logic for useContext error handling */}
                <Outlet /> {/* Outlet for child component rendering */}
            </section>
        </>
    );
};

export default ContentContainer;
