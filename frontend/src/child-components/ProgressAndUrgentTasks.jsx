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
            <div className="progressContainer" style={{ flexDirection: "column" }}>
                {isLoadingProgress && (
                    <p className="loadingMessage">
                        Retrieving the status of your tasks, please be
                        patient... 🫨
                    </p>
                )}
                {!isLoadingProgress &&
                    errorMessage && ( //Display error if present
                        <div className="errorContainer">
                            <p className="errorMessage">{errorMessage}</p>
                        </div>
                    )}{" "}
                {!isLoadingProgress && progressData.length >= 0 && (
                    <div>
                        <h4>Task Progress</h4>
                        {Object.entries(progressData).map(([status, count]) => (
                            <div key={status}>
                                <label>{statusLabels[status]}</label>
                                <progress
                                    value={count}
                                    max={Math.max(
                                        ...Object.values(progressData)
                                    )}
                                    className={`progress.${statusLabels[status].replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase())}`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="urgentContainer">
                <div className="urgentTitleContainer">
                </div>
                {isLoadingUrgent && (
                    <p className="loadingMessage">
                        Retrieving your tasks and checking dates. Please be
                        patient...
                    </p>
                )}
                {!isLoadingUrgent &&
                    errorMessage && ( //Display error if present
                        <div className="errorContainer">
                            <p className="errorMessage">{errorMessage}</p>
                        </div>
                    )}
                {!isLoadingUrgent && (
                    <div>
                        {tasks.length > 0 ? (
                            <>
                            <h4>Upcoming Tasks</h4>
                            <h5>These are due within the next 5 days</h5>
                            <UpcomingTasks tasks={tasks} navigate={navigate} />
                            </>
                        ) : (
                            <p>
                                Oh no! 😱 You don&apos;t have any tasks or goals yet!
                                <br />
                                Use the add button (+) on your dashboard menu to
                                create one.<br/> You can come back to see your progress 😄
                            </p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProgressAndUrgentTasks;
