import { useState, useEffect } from "react";
import UpcomingTasks from "./UpcomingTasks";
import { useNavigate } from "react-router-dom";


const ProgressAndUrgentTasks = () => {
    const [progressData, setProgressData] = useState({});
    const [isLoadingProgress, setIsLoadingProgress] = useState(true);
    const [isLoadingUrgent, setIsLoadingUrgent] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [tasks, setTasks] = useState({});

    const fetchProgressData = async () => {
        try {
            const user_id = localStorage.getItem("loginId");
            const url = `${
                import.meta.env.VITE_SOURCE_URL
            }/tasks/status/${user_id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            });

            const statusData = await response.json();
            console.log("status count loader successful", statusData);
            setProgressData(statusData);
            setIsLoadingProgress(false);
            return;
        } catch (error) {
            console.error("status count ERROR: ", error);
            setIsLoadingProgress(false);
            const errorMessage = `${error.error_code}: ${error.error_detail}`;
            setErrorMessage(errorMessage);
        }
    };

    const fetchTasks = async () => {
        try {
            const user_id = localStorage.getItem("loginId");
            const url = `${
                import.meta.env.VITE_SOURCE_URL
            }/tasks/user/${user_id}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            });

            const taskData = await response.json();
            const tasks = taskData.data
            console.log("Get tasks function successful", tasks)
            setTasks(tasks)
            setIsLoadingUrgent(false);
            
        } catch (error) {
            console.error("task fetch error: ", error);
            const errorMessage = `${error.error_code}: ${error.error_detail}`;
            setIsLoadingUrgent(false);
            setErrorMessage(errorMessage);
            return;
        }
    };

    useEffect(() => {
        fetchProgressData();
        fetchTasks();
    }, []);

    const statusLabels = {
        1: "Not Started",
        2: "In Progress",
        3: "Completed",
    };

    const navigate = useNavigate();

    return (
        <>
            <div style={{ flexDirection: "column" }}>
                <h2>Task Progress</h2>
                {/* conditionally to display you have no tasks and show start creating tasks button */}
                {isLoadingProgress && (
                    <p className="loading-message">
                        Retrieving the status of your tasks, please be
                        patient...
                    </p>
                )}
                {!isLoadingProgress &&
                    errorMessage && ( //Display error if present
                        <div className="error-container">
                            <p className="error-message">{errorMessage}</p>
                        </div>
                    )}{" "}
                {!isLoadingProgress && progressData && (
                    <div>
                        {Object.entries(progressData).map(([status, count]) => (
                            <div key={status}>
                                <label>{statusLabels[status]}</label>
                                <progress
                                    value={count}
                                    max={Math.max(
                                        ...Object.values(progressData)
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h2>Upcoming Tasks</h2>
                {isLoadingUrgent && (
                    <p className="loading-message">
                        Retrieving your tasks and checking dates. Please be
                        patient...
                    </p>
                )}
                {!isLoadingUrgent &&
                    errorMessage && ( //Display error if present
                        <div className="error-container">
                            <p className="error-message">{errorMessage}</p>
                        </div>
                    )}
                {!isLoadingUrgent && (
                    <div>
                        {tasks.length > 0 ? (
                            <UpcomingTasks tasks={tasks} navigate={navigate} />
                        ) : (
                            <p>
                                Oh no! 😱 <br />
                                You don&apos;t have any tasks or goals yet!
                                <br />
                                use the + button on your dashboard menu to
                                create one.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProgressAndUrgentTasks;
