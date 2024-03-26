import styles from "../styles/ContentContainer.module.css";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import EditAndReturnTask from "./EditAndReturnTask";

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { format } from "date-fns";


export async function loader() {
    try {
        const user_id = localStorage.getItem("loginId");
        const url = `${import.meta.env.VITE_SOURCE_URL}/tasks/user/${user_id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        const data = await response.json();
        console.log("Get tasks loader successful"); //data used with map on return
        return data;
        
    } catch (error) {
        console.error("GET MY TASKS ERROR: ", error);
        const errorMessage = `${error.error_code}: ${error.error_detail}`;
        return errorMessage;
    }
}

const ViewTasksByUser = () => {

    const { data, errorMessage, isLoading } = useLoaderData();
    console.log("task object to map:", data);

    const [open, setOpen] = useState(false);
    const [task, setTask] = useState(null);

    const handleClick = (task) => {
        console.log("Edit Clicked, Prop Passed:", task);
        setTask(task);
        setOpen(true)
    };

    const handleCloseOnSuccess = () => {
        setOpen(false);
        console.log("edit form close on success triggered ", open);
    };

    const onCloseModal = () => setOpen(false);

    const statusLabels = {
        1: "Not Started",
        2: "In Progress",
        3: "Completed",
        };
        
    return (
        <>
            <h2>All Tasks</h2>
            {isLoading && (
                <p className="loading-message">
                    Retrieving and loading all of your created tasks. Please be
                    patient...
                </p>
            )}
            {!isLoading &&
                errorMessage && ( //Display error if present
                    <div className="error-container">
                        <p className="error-message">{errorMessage}</p>
                    </div>
                )}{" "}
            {!isLoading && data && (
                <div>
                    <ul className={styles.taskContainer}>
                        {data.map((task, index) => {
                            return (
                                <li key={index} className={styles.taskCard}>
                                    Task {task.id}{" "}
                                    <button
                                        type="button"
                                        onClick={() => handleClick(task)}
                                    >
                                        Edit
                                    </button>
                                    <br />
                                    Progress Status: {statusLabels[task.status_id]}
                                    <br />
                                    Title: {task.title}
                                    <br />
                                    Category: {task.category}
                                    <br />
                                    Purpose: {task.purpose_description}
                                    {task.due_date &&
                                        task.due_date.length > 1 && (
                                            <>
                                            <br />
                                                Goal Deadline:{" "}
                                                {format(task.due_date, "MMM dd, yyyy h:mma (z)")}
                                            </>
                                        )}
                                    {task.completion_count >= 0 && (
                                        <>
                                        <br/>
                                            Weekly Completion Count:{" "}
                                            {task.completion_count}
                                        </>
                                    )}
                                    <br />
                                    Achievement Actions: {task.achievement_steps}
                                    <br />
                                </li>
                            );
                        })}
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
            )}
        </>
    );
};

export default ViewTasksByUser;
