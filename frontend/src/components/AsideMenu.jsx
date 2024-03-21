import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/AsideMenu.module.css";
import NewTaskModal from "../child-components/NewTaskModal";

// eslint-disable-next-line react/prop-types
const AsideMenu = () => {
    const menuItems = [
        { name: "Focus My Day", id: "" }, //load default child route
        { name: "My Tasks", id: "view-tasks-by-user" },
        // remember to add any new child components (name: for link id: for child route navigation)
    ];
    const [activeMenuItem, setActiveMenuItem] = useState(() => {
        return menuItems[0].id; // Set "Focus My Day" as initial active menu item
    }); 

    const navigate = useNavigate();

    //navigation to route based on active item
    const handleMenuClick = (menuItem) => {
        setActiveMenuItem(menuItem.id);
        navigate(`/dashboard/${menuItem.id}`);
    };

    const [showModal, setShowModal] = useState(false);
    const handleClick = () => {
        setShowModal(true);
    };

    return (
        <aside className={styles.asideMenu}>
            <button
                        className={styles.newTaskButton}
                        onClick={handleClick}
                    >
                        +
                    </button>
                    {showModal && <NewTaskModal />}
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
