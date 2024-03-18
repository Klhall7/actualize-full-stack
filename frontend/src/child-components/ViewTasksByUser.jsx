import { useLoaderData } from "react-router-dom";

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
        console.log("response object :", data);

        return data;
    } catch (error) {
        console.error("ERROR: ", error);
        return false;
    }
}

const ViewTasksByUser = () => {
    const { data } = useLoaderData();
    console.log(data);

    return (
        <>
            <h2>All Tasks</h2>
            <ul>
                {data.map((task, index) => {
                    return (
                        <li key={index}>
                            {task.title}
                            {task.due_date}
                            {task.description}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default ViewTasksByUser;
