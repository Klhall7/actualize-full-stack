import { useState } from "react";
// eslint-disable-next-line react/prop-types
const NewTaskForm = ({ onClose }) => {
const [errorMessage, setErrorMessage] = useState(null)

    const handleSubmit = async (event) => {
        setErrorMessage(null); // Clear any previous error message
    
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
                alert(`Task successfully created`);
                onClose(); // prop callback from modal, passed in render 

        } catch (error) {
            console.error("Create Task ERROR JSON:", error);
            setErrorMessage(error.error_detail)
            console.log(errorMessage)
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
                    {" "}
                    Title:
                    <input
                        type="text"
                        name="title"
                        placeholder="concise title"
                        required
                    />
                </label>
                <label>
                    {" "}
                    Due Date(optional):
                    <input
                        type="datetime-local"
                        name="date"
                        defaultValue=""
                        //string on formData submit then backend sets compatible timestamp
                    />
                </label>
                <label>
                    {" "}
                    Description:
                    <textarea
                        type="text"
                        name="description"
                        placeholder="why does this task matter to you and what defines successful completion"
                        required
                    />
                </label>
                <label>
                    {" "}
                    Status(default):
                    <input
                        type="number"
                        name="status_id"
                        min="1"
                        max="2"
                        defaultValue="1"
                    />
                </label>
                <button type="submit">Save and Submit</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </>
    );
};
export default NewTaskForm;
