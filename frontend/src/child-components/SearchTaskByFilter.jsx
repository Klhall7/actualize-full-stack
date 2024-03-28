import { useState } from "react";
import FilteredTaskList from "./FilteredTaskList";

const SearchTaskByFilter = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredTasks, setFilteredTasks] = useState({});
    const defaultMsg = String("Hello fabulous, start a search ☝ Your results will be here ")
    const [loadingMsg, setLoadingMsg] = useState(defaultMsg);

    const [open, setOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleSubmit = async (event) => {
        setLoadingMsg("Loading search data, please wait...");
        event.preventDefault();
        const formData = new FormData(event.target);
        const columnToSearch = formData.get("column");
        const value = formData.get("value");
        const searchValue = String(value),
            searchData = `search params sent: ${columnToSearch} ${searchValue}`;
        console.log(searchData);

        const user_id = localStorage.getItem("loginId");

        try {
            const url = `${
                import.meta.env.VITE_SOURCE_URL
            }/tasks/filter/${user_id}?column=${columnToSearch}&value=${searchValue}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            }).then((response) => response.json());

            console.log("search response:", response);
            setIsLoading(false);
            setFilteredTasks(response);
            return;
        } catch (error) {
            console.error("Search ERROR: ", error);
            setIsLoading(false);
            setErrorMessage(`${error.error_detail}`);
            console.log(errorMessage);
            return;
        }
    };

    const statusOptions = [
        { value: 1, label: "Not Started" },
        { value: 2, label: "In Progress" },
        { value: 3, label: "Completed" },
    ];
    const columnOptions = [
        { value: " ", label: "make a selection"},
        { value: "title", label: "title" },
        { value: "category", label: "category" },
        { value: "status_id", label: "progress status" },
    ];

    const categoryOptions = [
        { value: "Mental Health", label: "Mental Health" },
        { value: "Physical Health", label: "Physical Health" },
        { value: "Social Health", label: "Social Health" },
        { value: "Organization", label: "Organization" },
        { value: "Productivity", label: "Productivity" },
        { value: "Skill Development", label: "Skill Development" },
        { value: "Career", label: "Career" },
        { value: "Finances", label: "Finances" },
    ];

    const [selectedColumn, setSelectedColumn] = useState("");
    const handleChange = (event) => {
        setSelectedColumn(event.target.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="column-select">
                    Choose a column to filter by:
                </label>
                <select
                    name="column"
                    id="column-select"
                    onChange={handleChange}
                >
                    {columnOptions.map((option) => (
                        <option key={option.value} value={option.value}
                            >
                            {option.label}
                        </option>
                    ))}
                </select>
                {selectedColumn && ( 
                <>
                <label htmlFor="value">
                    {selectedColumn === "title" ? (
                        <>
                            {" "}
                            Enter Title:
                            <input
                                id="value"
                                name="value"
                                type="text"
                                placeholder="existing title"
                                required
                            />
                        </>
                    ) : selectedColumn === "category" ||
                    selectedColumn === "status_id" ? (
                        <>
                            Choose a {selectedColumn} to filter by:
                            <select name="value" id="value" required>
                                {selectedColumn === "category"
                                    ? categoryOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))
                                    : statusOptions.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                            </select>
                        </>
                    ) : null}
                </label>
                </>
                )}
                <button type="submit" disabled={!selectedColumn}>Search</button>
                {isLoading ? (
                    <p className="loading-message">{loadingMsg}</p>
                ) : filteredTasks.length > 0 ? (
                    <div>
                        <h2>Search Results</h2>
                        <FilteredTaskList
                            tasks={filteredTasks}
                            open={open}
                            setOpen={setOpen}
                            setSelectedTask={setSelectedTask}
                            selectedTask={selectedTask}
                        />{" "}
                    </div>
                ) : (
                    <p>Sorry, no matches were found for your search criteria 🧐<br/>
                    Check your spelling and case discrepancies then try again...</p>
                )}
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
            </form>
        </>
    );
};

export default SearchTaskByFilter;
