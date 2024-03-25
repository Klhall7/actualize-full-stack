import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const EditAndReturnTask = ({ task, onClose }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const due_date = formData.get("date");
        const purpose_description = formData.get("purpose_description");
        const user_id = localStorage.getItem("loginId"); //preset
        const status_id = formData.get("status_id");
        const completion_count = formData.get("completion_count");
        const achievement_steps = formData.get("achievement_steps");
        const category = formData.get("category");
        const submittedData = {
            title: String(title),
            due_date: String(due_date),
            purpose_description: String(purpose_description),
            user_id: String(user_id),
            status_id: Number(status_id),
            completion_count: Number(completion_count),
            achievement_steps: String(achievement_steps),
            category: String(category),
        };
        console.log("edit submission data sent:", submittedData);

        try {
            const url = `${import.meta.env.VITE_SOURCE_URL}/update-task/${
                task.id
            }`;
            const editResponse = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
                body: JSON.stringify(submittedData),
            }).then((response) => response.json());

            console.log("edit success json response:", editResponse);
            const goal = editResponse.data[0];
            onClose();
            navigate("/dashboard/view-last-task", { state: { key: { goal } } });
            return goal;
        } catch (error) {
            console.error("EDIT ERROR JSON RESPONSE: ", error);
            setErrorMessage(`${error.error_code}: ${error.error_detail}`);
            console.log(errorMessage);
            return;
        }
    };

    const categories = [
        "Mental Health",
        "Physical Health",
        "Social Health",
        "Organization",
        "Productivity",
        "Skill Development",
        "Career",
        "Finances",
    ];

    const statusOptions = [
        { value: 1, label: "Not Started" },
        { value: 2, label: "In Progress" },
        { value: 3, label: "Completed" },
    ];

    return (
        //defaultValue prevents unnecessary changes and helps with UI
        <>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "solid 2px red",
                }}
            >
                <p>
                    You are editing <span>Task {task.id}</span>
                </p>
                <label>
                    Category:
                    <select name="category" required>
                        {categories.map((category) => (
                            <option key={category} defaultValue={task.category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </label>{" "}
                <label>
                    Title:
                    <input type="text" name="title" defaultValue={task.title} />
                </label>{" "}
                <label>
                    Purpose:
                    <textarea
                        name="purpose_description"
                        defaultValue={task.purpose_description}
                    />
                </label>{" "}
                <label>
                    Progress Status:
                    <select name="status_id" required>
                        {statusOptions.map((option) => (
                            <option
                                key={option.value}
                                value= {option.value}
                                defaultValue={task.status_id}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>{" "}
                <label>
                    Weekly Consistency Count (optional):
                    <input
                        type="number" //optional
                        name="completion_count"
                        min="0"
                        max="7"
                        defaultValue={task.completion_count}
                    />
                </label>
                <label>
                    Due_Date (optional):
                    <input
                        type="datetime-local" //optional
                        name="date"
                        defaultValue={task.due_date}
                        //string on formData submit then backend sets compatible timestamp
                    />
                </label>
                <label>
                    Achievement Steps:
                    <textarea
                        type="text"
                        name="achievement_steps"
                        defaultValue={task.achievement_steps}
                    />
                </label>
                <button type="submit">Save and Submit</button>
            </form>
            {errorMessage && (
                <div className="error-container">
                    <p className="error-message">{errorMessage}</p>
                </div>
            )}
        </>
    );
};
export default EditAndReturnTask;
