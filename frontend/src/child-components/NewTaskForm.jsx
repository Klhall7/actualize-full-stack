import { useState } from "react";
// eslint-disable-next-line react/prop-types
const NewTaskForm = ({ onClose }) => {
    const [errorMessage, setErrorMessage] = useState(null);

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
            const newTaskArray = response.data[0];
            alert(`Task successfully created`);
            onClose(); // prop callback from modal, passed in render
            return newTaskArray

        } catch (error) {
            console.error("Create Task ERROR:", error); //check error
            setErrorMessage(`${error.error_code}: ${error.error_detail}`);
            console.log(errorMessage);
        }
    };

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
                    You are creating a<span> new </span>task
                </p>
                <label>
                    Category:
                    <input
                        type="text"
                        name="category"
                        placeholder="select the category this falls under"
                        required //set to dropdown
                    />
                </label>{" "}
                <label>
                    Value to you:
                    <textarea
                        type="text"
                        name="purpose_description"
                        placeholder="why does this task matter to you and what defines successful completion"
                        required
                    />
                </label>{" "}
                <label>
                    Due Date(optional):
                    <input
                        type="datetime-local"
                        name="date"
                        defaultValue=""
                        //string on formData submit then backend sets compatible timestamp
                    />
                </label>{" "}
                <label>  
                    Weekly Consistency Count:
                    <input
                        type="number" //optional
                        name="completion_count"
                        min="0"
                        max="0"
                        placeholder="if you would like to measure number of times you did something"
                    />
                </label>{" "}
                <label> 
                    Achievement Steps:
                    <input
                        type="text"
                        name="achievement_steps"
                        placeholder="identify at least one step to start your achieving your task"
                        required
                    />
                </label>{" "}
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        placeholder="concise title"
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
