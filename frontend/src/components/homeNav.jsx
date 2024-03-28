import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../images/actualize-logo-g-transp.png"
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
                    src={logo}
                    alt="Actualize App Logo"
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
