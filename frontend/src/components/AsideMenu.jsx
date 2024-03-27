import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/AsideMenu.module.css";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import NewTaskForm from "../child-components/NewTaskForm";

// eslint-disable-next-line react/prop-types
const AsideMenu = () => {
    const menuItems = [
        { name: "Focus My Day", id: "" }, //load default child route
        { name: "My Tasks", id: "view-tasks-by-user" }, 
        { name: "Filter My Tasks", id: "view-filtered-tasks" },
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

    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        setOpen(true);
        console.log("New Task Button Clicked");
        console.log("show modal state handle open", open);
    };
    const handleCloseModal = () => {
        setOpen(false);
        console.log("show modal state handle close", open);
    };

    return (
        <aside className={styles.asideMenu}>
            <button
                className={
                    open ? styles.newTaskButtonActive : styles.newTaskButton
                }
                onClick={handleOpenModal}
            >
                +
            </button>
            <Modal open={open} onClose={handleCloseModal} center style={{padding:"2rem"}}>
                <div className="modal-content">
                    <NewTaskForm
                        //form handles it's own submission
                        onClose={handleCloseModal}
                    />
                </div>
            </Modal>

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
