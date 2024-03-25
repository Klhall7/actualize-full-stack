import { useLocation } from "react-router-dom";

const LastTaskInteraction = () => {
    const location = useLocation();
    console.log("LOCATION", location.state);
    const array = location.state;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        return date.toLocaleDateString("en-US", options);
    };

    return (
        <>
            <p>Title: {array.key.goal.title}</p>
            <ul>
                <li>
                    Category: {array.key.goal.category}
                    <br />
                    Purpose: {array.key.goal.purpose_description}
                    <br />
                    {array.key.goal.due_date &&
                        array.key.goal.due_date.length > 1 && (
                            <>
                                Goal Deadline:{" "}
                                {formatDate(array.key.goal.due_date)}
                            </>
                        )}
                    <br />
                    {array.key.goal.completion_count >= 0 && (
                        <>
                            Weekly Completion Count:{" "}
                            {array.key.goal.completion_count}
                        </>
                    )}
                    <br />
                    Steps to Achievement: {array.key.goal.achievement_steps}
                    <br />
                </li>
            </ul>
        </>
    );
};

export default LastTaskInteraction;
