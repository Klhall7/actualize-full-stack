import { useState, useRef, useEffect } from "react";
import NewTaskForm from "./NewTaskForm";

const NewTaskModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        // for outside clicks
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]); // Only run when modal visibility changes

    return (
        <>
            {isOpen && ( // Render the modal only when visible
                <div className="modal" ref={modalRef}>
                    <div className="modal-content">
                        <NewTaskForm
                            //form handles it's own submission
                            onClose={() => {
                                handleCloseModal();
                                //refresh the local page;
                            }}
                        />{" "}
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewTaskModal;
