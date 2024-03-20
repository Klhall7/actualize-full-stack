import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import EditAndReturnTask from "./EditAndReturnTask";
import { useAuth } from "../AuthContext";

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
        return data;
    } catch (error) {
        console.error("ERROR: ", error);
        return false;
    }
}

const ViewTasksByUser = () => {
    const { refreshSession } = useAuth();

    useEffect(() => {
        refreshSession();
    }, [refreshSession]);

    const { data } = useLoaderData();
    console.log("api loader response:", data);

    const [showForm, setShowForm] = useState(false);
    const [task, setTask] = useState(null);

    const handleClick = (task) => {
        console.log("Edit Clicked, PROP Passed:", task);
        setTask(task);
        setShowForm(true);
    };

    return (
        <>
            <h2>All Tasks</h2>

            <ul>
                {data.map((task, index) => {
                    return (
                        <li key={index}>
                            Task {task.id}{" "}
                            <button
                                type="button"
                                onClick={() => handleClick(task)}
                            >
                                Edit
                            </button>
                            <br />
                            Title: {task.title}
                            <br />
                            Due By: {task.due_date}
                            <br />
                            Description: {task.description}
                        </li>
                    );
                })}
            </ul>
            {showForm && task && <EditAndReturnTask task={task} />}
        </>
    );
};

export default ViewTasksByUser;