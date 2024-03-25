import { useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NewTaskForm = ({ onClose }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        setErrorMessage(null); // Clear any previous error message

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
        console.log("new submission data sent:", submittedData);

        try {
            const url = `${import.meta.env.VITE_SOURCE_URL}/add-task`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
                body: JSON.stringify(submittedData),
            }).then((response) => response.json());

            console.log("new task array:", response.data[0]);
            const goal = response.data[0];
            onClose(); // prop callback from modal, passed in render
            navigate("/dashboard/view-last-task", { state: { key: { goal } } });
            return goal;
        } catch (error) {
            console.error("Create Task ERROR:", error); //check error
            setErrorMessage(`${error.error_code}: ${error.error_detail}`);
            console.log(errorMessage);
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

    return (
        //defaultValue prevents unnecessary changes and helps with UI
        <>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "solid 2px green",
                }}
            >
                <p>
                    You are creating a<span> new </span>Goal
                </p>
                <label>
                    Category:
                    <select name="category" required>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </label>{" "}
                <label>
                    Purpose:
                    <textarea
                        type="text"
                        name="purpose_description"
                        placeholder="why does this task matter to you and what defines successful completion"
                        required
                    />
                </label>{" "}
                <label>
                    Due Date (optional):
                    <input
                        type="datetime-local"
                        name="date"
                        defaultValue=""
                        //string on formData submit then backend sets compatible timestamp
                    />
                </label>{" "}
                <label>
                    Weekly Consistency Count (optional):
                    <input
                        type="number" //optional
                        name="completion_count"
                        min="0"
                        max="0"
                        placeholder="if you would like to measure number of times you did something"
                    />
                </label>{" "}
                <label>
                    Achievement Steps/Tasks:
                    <textarea
                        name="achievement_steps"
                        placeholder="identify at least one step to start your achieving your goal"
                        required
                    />
                </label>{" "}
                <label>
                    Informative Title:
                    <input
                        type="text"
                        name="title"
                        placeholder="title should be short and informative. If its a measurable action for example run-1m-biweekly"
                        required
                    />
                </label>{" "}
                <label>
                    {" "}
                    Progress Status(defaults to Not Started):
                    <input
                        type="number"
                        name="status_id"
                        min="1"
                        max="3"
                        defaultValue="1"
                    />
                </label>
                <button type="submit">Save and Create Task</button>{" "}
                {errorMessage && (
                    <div className="error-container">
                        <p className="error-message">{errorMessage}</p>
                    </div>
                )}
            </form>
        </>
    );
};
export default NewTaskForm;
