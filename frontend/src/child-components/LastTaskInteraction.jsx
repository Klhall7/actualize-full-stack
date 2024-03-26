import { useLocation } from "react-router-dom";
import { useState } from "react";

import EditAndReturnTask from "./EditAndReturnTask";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const LastTaskInteraction = () => {
    const location = useLocation();
    console.log("location state", location.state);
    const array = location.state;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
    };

    const statusLabels = {
        1: "Not Started",
        2: "In Progress",
        3: "Completed",
    };
    const taskStatus = array.key.goal.status_id;
    const displayedStatus = statusLabels[taskStatus];

    const [open, setOpen] = useState(false);
    const onCloseModal = () => setOpen(false);
    const task = array.key.goal;
    const handleClick = (task) => {
        console.log("Edit Clicked, Prop Passed:", task);
        setOpen(true);
    };
    const handleCloseOnSuccess = () => {
        setOpen(false);
        console.log("edit form close on success triggered ", open);
    };

    return (
        <>
            <div>
                <ul>
                    <li>
                        Title: {array.key.goal.title}
                        {' '}<button type="button" onClick={() => handleClick(task)}>
                            Edit
                        </button>
                        <br />
                        Category: {array.key.goal.category}
                        <br />
                        Purpose: {array.key.goal.purpose_description}
                        <br />
                        Status: {displayedStatus}
                        <br />
                        Steps to Achievement: {array.key.goal.achievement_steps}
                        <br />
                        {array.key.goal.due_date &&
                            array.key.goal.due_date.length > 1 && (
                                <>
                                    Goal Deadline:{" "}
                                    {formatDate(array.key.goal.due_date)}
                                </>
                            )}
                        {array.key.goal.completion_count && (
                            <>
                                Completion Count:{" "}
                                {array.key.goal.completion_count}
                            </>
                        )}
                    </li>
                </ul>
                <Modal open={open} onClose={onCloseModal}>
                    {open && task && (
                        <EditAndReturnTask
                            task={task}
                            onClose={handleCloseOnSuccess}
                        />
                    )}
                </Modal>
            </div>
        </>
    );
};

export default LastTaskInteraction;
