import { useRef, useEffect } from "react";
import NewTaskForm from "./NewTaskForm";

// eslint-disable-next-line react/prop-types
const NewTaskModal = ({ isOpen, onClose }) => {
    console.log("NewTaskModal rendered" );
    const modalRef = useRef(null);

    const handleCloseModal = () => {
        onClose(); //prop callback, boolean state set in AsideMenu(parent)
    };

    useEffect(() => {
        if (isOpen && modalRef.current) {
          modalRef.current.focus(); // Focus the modal element when it opens
        }
    }, [isOpen]);

    return (
        <>
            {isOpen && ( // Render the modal only when visible
                <div className="modal" ref={modalRef}>
                    <div className="modal-content">
                        <NewTaskForm
                            //form handles it's own submission
                            onClose={handleCloseModal}
                        />{" "}
                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewTaskModal;
