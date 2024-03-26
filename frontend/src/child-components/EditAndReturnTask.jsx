import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

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
            > <span>You are editing Task {task.id}</span><br/>
                <label>
                    Category:
                    <select name="category" required>
                        {categories.map((category) => (
                            <option key={category} defaultValue={task.category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Title:
                    <input type="text" name="title" defaultValue={task.title} 
                    data-tooltip-id="title-tooltip-multiline"
                    data-tooltip-html="Does the title need to be updated?<br />it should be easy to identify the task and any deadlines"
                    data-tooltip-place="top"/>
                    <Tooltip id='title-tooltip-multiline'/>
                </label><br/>
                <label>
                    Progress Status:
                    <select name="status_id" required 
                    data-tooltip-id="status-tooltip"
                    data-tooltip-content="Has your progress changed?">
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
                    <Tooltip id='status-tooltip'/>
                </label>
                <label>
                    Purpose:
                    <textarea
                        name="purpose_description"
                        defaultValue={task.purpose_description}
                        data-tooltip-id="purpose-tooltip"
                        data-tooltip-content="Has your desired outcome changed?"
                        data-tooltip-place="top"
                    /> <Tooltip id="purpose-tooltip"/>
                </label>
                <label>
                    Completion Count(optional):
                    <input
                        type="number" //optional
                        name="completion_count"
                        min="0"
                        max="7"
                        defaultValue={task.completion_count}
                        data-tooltip-id="consistency-tooltip"
                        data-tooltip-content="Tracking Consistency?"
                        data-tooltip-place="top"
                    /> <Tooltip id="consistency-tooltip"/>
                </label>
                <label>
                    Deadline (optional):
                    <input
                        type="datetime-local" //optional
                        name="date"
                        defaultValue={task.due_date}
                        //string on formData submit then backend sets compatible timestamp
                        data-tooltip-id="date-tooltip"
                        data-tooltip-content="Need to add or adjust the deadline?"
                        data-tooltip-place="top"
                    /> <Tooltip id="date-tooltip"/>
                </label>
                <label>
                    Achievement Steps:
                    <textarea
                        type="text"
                        name="achievement_steps"
                        defaultValue={task.achievement_steps}
                        data-tooltip-id="achievement-tooltip-multiline"
                        data-tooltip-html="Anything new to consider?<br/>
                        Have you completed any steps?"
                        data-tooltip-place="top"
                    /> <Tooltip id="achievement-tooltip-multiline"/>
                </label> 
                <button type="submit">Save Changes</button>
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
