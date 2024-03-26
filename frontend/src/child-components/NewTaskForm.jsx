import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

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

    const statusOptions = [{ value: 1, label: "Not Started" }];

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
                    You are creating a<span> new </span>Goal.
                    <br />
                    Remember, you can always make changes later.
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
                </label>
                <label>
                    {" "}
                    Purpose:
                    <textarea
                        type="text"
                        name="purpose_description"
                        placeholder="define success"
                        required
                        data-tooltip-id="purpose-tooltip-multiline"
                        data-tooltip-html="Why is this goal important to you?<br />What do you want to achieve?"
                        data-tooltip-place="top"
                    />
                    <Tooltip id="purpose-tooltip-multiline" />
                </label>
                <label>
                    Deadline:
                    <input
                        type="datetime-local"
                        name="date"
                        defaultValue=""
                        //string on formData submit then backend sets compatible timestamp
                        data-tooltip-id="date-tooltip-multiline"
                        data-tooltip-html="Optional field to set a timeline priority for this goal.<br /> It can be a hard deadline or you can make it ongoing;<br />At the end of every time period (weekly, quarterly, daily etc.)<br />update the date to the next date you want to complete it by.<br /> Doing so encourage you to interact with the goal"
                        data-tooltip-place="top"
                    />{" "}
                    <Tooltip id="date-tooltip-multiline" />
                </label>
                <label>
                    Weekly Completion Count:
                    <input
                        type="number" //optional
                        name="completion_count"
                        min="0"
                        max="0"
                        data-tooltip-id="consistency-tooltip-multiline"
                        data-tooltip-html="Optional field to measure progress by tracking your consistency.<br /> For example, if you want to workout 3 times a week you<br /> would want this number to reach 3 by the end of the week.<br /> It will start at zero."
                        data-tooltip-place="top"
                    />{" "}
                    <Tooltip id="consistency-tooltip-multiline" />
                </label>
                <label>
                    Actions to Achievement:
                    <textarea
                        name="achievement_steps"
                        required
                        data-tooltip-id="achieve-tooltip-multiline"
                        data-tooltip-html="Identify an action to start achieving this goal.<br /> How will you keep yourself accountable?<br />It could be a task, a set of tasks, or a reminder."
                        data-tooltip-place="top"
                    />{" "}
                    <Tooltip id="achieve-tooltip-multiline" />
                </label>
                <label>
                    Informative Title:
                    <input
                        type="text"
                        name="title"
                        required
                        data-tooltip-id="title-tooltip-multiline"
                        data-tooltip-html="Short yet informative title that aligns with your goal. <br />For example, 'workout-3 days a week' <br />The idea is to make it easy to identify"
                        data-tooltip-place="top"
                    />{" "}
                    <Tooltip id="title-tooltip-multiline" />
                </label>
                <label>
                    Progress Status(default):
                    <select name="status_id" required>
                        {statusOptions.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                selected={option.value === 1}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Save and Create</button>{" "}
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
