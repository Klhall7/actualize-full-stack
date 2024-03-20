/* eslint-disable react/prop-types */

const EditAndReturnTask = ({ task }) => {
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

            if (!editResponse.status === 200) {
                throw new Error(
                    `API request failed with status: ${editResponse.status}`
                );
            }

            console.log("submit api response:", editResponse);
            alert(`successfully edited task`);
            return editResponse;
        } catch (error) {
            console.error("API RESPONSE ERROR: ", error);
            alert(`${error.message}`);
            return false;
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
        </>
    );
};
export default EditAndReturnTask;
