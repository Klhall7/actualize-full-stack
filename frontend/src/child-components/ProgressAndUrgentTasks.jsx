import { useState, useEffect } from "react";

const ProgressAndUrgentTasks = () => {
    const [progressData, setProgressData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

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
            setIsLoading(false);
            return;
        } catch (error) {
            console.error("status count ERROR: ", error);
            setIsLoading(false);
            const errorMessage = `${error.error_code}: ${error.error_detail}`;
            setErrorMessage(errorMessage);
        }
    };

    useEffect(() => {
        fetchProgressData();
    }, []);

    const statusLabels = {
        1: "Not Started",
        2: "In Progress",
        3: "Completed",
    };

    return (
        <>
            <div style={{ flexDirection: "column" }}>
                <h2>Task Progress</h2>
                {/* conditionally to display you have no tasks and show start creating tasks button */}
                {/* conditionally render do display of you have no tasks */}
                {/* implement handling for errors loading */}
                {isLoading && (
                    <p className="loading-message">
                        Retrieving the status of your tasks, please be
                        patient...
                    </p>
                )}
                {!isLoading &&
                    errorMessage && ( //Display error if present
                        <div className="error-container">
                            <p className="error-message">{errorMessage}</p>
                        </div>
                    )}{" "}
                {!isLoading && progressData && (
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
        </>
    );
};

export default ProgressAndUrgentTasks;
