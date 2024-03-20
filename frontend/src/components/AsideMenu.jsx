import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/AsideMenu.module.css";

// eslint-disable-next-line react/prop-types
const AsideMenu = () => {
    const menuItems = [
        { name: "Focus My Day", id: "" }, //load default child route
        { name: "My Tasks", id: "view-tasks-by-user" },
        // remember to add any new child components (name: for link id: for child route navigation)
    ];
    const [activeMenuItem, setActiveMenuItem] = useState(""); 
    const navigate = useNavigate();

    //navigation to route based on active item
    const handleMenuClick = (menuItem) => {
        setActiveMenuItem(menuItem.id);
        navigate(`/dashboard/${menuItem.id}`);
    };

    return (
        <aside className={styles.asideMenu}>
            <ul>
                {/* Iterate object array and create clickable list items*/}
                {menuItems.map((menuItem) => (
                    <li key={menuItem.id}>
                        {/* Dynamic className for active list item- precaution for style rendering*/}
                        <button
                            type="button"
                            className={
                                activeMenuItem === menuItem.id
                                    ? styles.active
                                    : ""
                            }
                            onClick={() => handleMenuClick(menuItem)}
                        >
                            {menuItem.name}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default AsideMenu;
