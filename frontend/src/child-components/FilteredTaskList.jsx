/* eslint-disable react/prop-types */
import { format } from "date-fns";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import EditAndReturnTask from "./EditAndReturnTask";

const FilteredTaskList = ({
    tasks,
    open,
    setOpen,
    setSelectedTask,
    selectedTask,
}) => {
    if (!tasks) {
        return <p>Loading tasks...</p>;
    }
    console.log("filtered tasks for list", tasks);
    console.log("selected task state", selectedTask);

    const handleClick = (task) => {
        console.log("Edit Clicked, Prop Passed:", task);
        console.log("selected task state", selectedTask);
        setSelectedTask(task);
        setOpen(true);
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
        <div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="task-card">
                        Task {task.id}{" "}
                        <button type="button" onClick={() => handleClick(task)}>
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
                        <br />
                        {task.due_date && task.due_date.length > 1 && (
                            <>
                                Goal Deadline:{" "}
                                {format(
                                    task.due_date,
                                    "MMM dd, yyyy h:mma (z)"
                                )}
                                <br />
                            </>
                        )}
                        {/* {task.completion_count >= 0 && (
                            <>
                                Weekly Completion Count: {task.completion_count}
                            </>
                        )} */}
                        Achievement Actions: {task.achievement_steps}
                        <br />
                    </li>
                ))}
            </ul>
            <Modal
                open={open}
                onClose={onCloseModal}
                style={{ padding: "2rem" }}
            >
                {open && selectedTask && (
                    <EditAndReturnTask
                        task={selectedTask}
                        onClose={handleCloseOnSuccess}
                    />
                )}
            </Modal>
        </div>
    );
};

export default FilteredTaskList;
