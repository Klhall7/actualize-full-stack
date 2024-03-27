import { Link } from "react-router-dom";
import { useState } from "react";
import placeholder from "../images/logo-placeholder.png";
import styles from "../styles/homeNav.module.css"

const HomeNav = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className={styles.navContainer}
        >
            <div className={styles.leftContainer}>
                <img
                    src={placeholder}
                    alt="Actualize App Logo"
                    // style={{ height: "2rem", width: "auto" }}
                />

                <Link className="about-link" to="">
                    {/* replace with path to about us page when setup */}
                    About
                </Link>
            </div>

            <div className={styles.rightDropdownContainer}>
                <button
                    type="button"
                    onClick={toggleDropdown}
                >
                    Get Started
                </button>

                {dropdownOpen && (
                    <ul id="ul-dropdown-options">
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                Create Account
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard">
                                My Dashboard
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default HomeNav;

//module styling note
// #ul-dropdown button {
//     /* Style the button as desired (background, padding, etc.) */
//   }

//   #ul-dropdown button:after {
//     content: "";
//     display: inline-block;
//     width: 0px;
//     height: 0px;
//     border-left: 5px solid transparent;
//     border-right: 5px solid transparent;
//     border-bottom: 8px solid #ccc; /* Adjust color as needed */
//     vertical-align: middle;
//     margin-left: 5px; /* Adjust spacing as needed */
//     transition: transform 0.3s ease-in-out;
//   }

//   #ul-dropdown:hover button:after {
//     transform: rotate(-90deg);
//   }
