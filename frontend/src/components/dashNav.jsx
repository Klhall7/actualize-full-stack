import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/dashNav.module.css";
import avatar from '../images/default-profile.jpg';
import placeholder from '../images/placeholder-image.jpeg';


const DashNav = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className={styles.navContainer}>
            <div>
                <Link to="/" id="logo-clickable">
                    <img 
                        className={styles.img}
                        src={placeholder} 
                        alt="clickable Actualize App Logo to go Home"
                    /> {/* Replace with logo */}
                    
                </Link>
            </div>
            <div className={styles.dropdownContainer}>
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className={styles.dropdownButton}
                >
                    {/* Replace w/ stored img */}
                    <img
                        className={styles.avatar}
                        src={avatar}  
                        alt="your avatar"
                    /> 
                </button>   
                {dropdownOpen && (
                    <ul className={styles.dropdownList}>
                        <li>
                            <Link to="/profile" 
                            className={styles.dropdownLink}>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout" 
                            className={styles.dropdownLink}>
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
// allow user to add an avatar on the profile page. Image source should be set to stored user image from supabase storage bucket- which will need to utilize supabase storage by user. Add conditional render to set image source to placeholder if there is no image for the user.
