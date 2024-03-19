import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/dashNav.module.css";

const DashNav = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className={styles.navContainer}>
            <div id="logo">
                <Link to="/" id="logo-clickable">
                    <img src="" alt="clickable Actualize App Logo to go Home" />
                    {/* Replace with logo image path once saved */}
                </Link>
            </div>
            <div id="dropdown">
                <button type="button" onClick={toggleDropdown}>
                    <img src="" alt="user avatar" />
                    {/* Replace with avatar image path once saved */}
                </button>
                {dropdownOpen && (
                    <ul id="dropdown-content">
                        <li>
                            <Link to="/profile" id="link">
                                Profile Details
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout" id="link">
                                Logout
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default DashNav;

//FUTURE IMPROVEMENTS:
// list item for customize avatar. When clicked, loads modal feature to upload image that will store new avatar image for this user. Image source should be set to stored user image from supabase storage - which will need to utilize supabase storage by user. Add conditional render to set image source to placeholder if there is no image for the user.
