/* eslint-disable react/prop-types */
import { format, isBefore } from "date-fns";

const filterUpcomingTasks = (tasks) => {
    const today = new Date();
    return tasks.filter((task) => {
        // Check if due date exists and is in the future
        return task.due_date && isBefore(task.due_date, today);
    });
};

const UpcomingTasks = ({ tasks , navigate }) => {
    console.log("upcoming tasks", tasks)
    if (!tasks) {
        return <p>Loading tasks...</p>
    }
    const upcomingTasks = filterUpcomingTasks(tasks);
    
    const handleClick = (task) => {
        const goal = task;
        console.log("view btn clicked, Prop Passed, navigating:", task);
        navigate("/dashboard/view-last-task", { state: { key: { goal } } });
    };

    return (
        <div>
            {upcomingTasks.length > 0 ? (
                    <ul>
                        {upcomingTasks.map((task) => (
                            <li key={task.id}>
                                Goal: {task.title}
                                <br/>
                                <span>
                                Goal Deadline:{" "}
                                    {format(
                                        task.due_date,
                                        "MMM dd, yyyy h:mma (z)"
                                    )}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleClick(task)}
                                >
                                    View Task
                                </button>
                            </li>
                        ))}
                    </ul>
            ) : (
                <p>You don&apos;t have any urgent or upcoming tasks!</p>
            )}
        </div>
    );
};

export default UpcomingTasks;
