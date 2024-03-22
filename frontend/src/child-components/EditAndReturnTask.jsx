import { useState } from "react";

/* eslint-disable react/prop-types */
const EditAndReturnTask = ({ task, onClose }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const due_date = formData.get("date");
        const description = formData.get("description");
        const user_id = localStorage.getItem("loginId"); //preset
        const status_id = formData.get("status_id");
        const submittedData = {
            title: String(title),
            due_date: String(due_date),
            description: String(description),
            user_id: String(user_id),
            status_id: Number(status_id),
        };
        console.log("submission data sent:", submittedData);

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
            const editedTaskArray = editResponse.data[0]
            alert(`successfully edited task`);
            onClose()
            return editedTaskArray;
            
        } catch (error) {
            console.error("EDIT ERROR JSON RESPONSE: ", error);
            setErrorMessage(`${error.error_code}: ${error.error_detail}`);
            console.log(errorMessage);
            return;
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
                    border: "solid 2px red",
                }}
            >
                <p>
                    You are editing <span>Task {task.id}</span>
                </p>
                <label>
                    {" "}
                    Title:
                    <input type="text" name="title" defaultValue={task.title} />
                </label>
                <label>
                    {" "}
                    Due Date:
                    <input
                        type="datetime-local"
                        name="date"
                        defaultValue={task.due_date}
                        //string on formData submit then backend sets compatible timestamp
                    />
                </label>
                <label>
                    {" "}
                    Description:
                    <input
                        type="text"
                        name="description"
                        defaultValue={task.description}
                    />
                </label>
                <label>
                    {" "}
                    Status:
                    <input
                        type="number"
                        name="status_id"
                        min="1"
                        max="10"
                        defaultValue={task.status_id}
                        //refine to dropdown text that gets converted to number (1=not started etc.)
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
