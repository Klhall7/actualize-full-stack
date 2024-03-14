import { useState } from "react";
import { Link } from "react-router-dom";

const DashNav = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <nav className="">
            {/* replace "" with styles mod once created */}
            <div id="logo">
                <img src="" alt="Actualize App Logo" />
                {/* Replace with logo path once saved */}
            </div>
            <div id="profile-dropdown">
                <button type="button" onClick={toggleDropdown}>
                    <img src="" alt="user avatar" />
                    {/* Replace with avatar image placeholder once saved */}
                </button>
                {dropdownOpen && (
                    <ul id="dropdown-content">
                        <li>
                            <Link to="/profile" id="link">
                                Profile Settings
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

//styling note for module
// #profile-dropdown {
//     position: relative; /* Enable positioning for dropdown content */
//     display: inline-block; /* Allow side-by-side elements */
//   }

//   #profile-dropdown button {
//     /* Style the button as desired (background, padding, etc.) */
//     border: none; /* Remove default button border */
//     cursor: pointer; /* Indicate interactive element */
//   }

//   #profile-dropdown:hover button:after {
//     /* Show dropdown indicator on hover */
//     content: "";
//     display: inline-block;
//     width: 0px;
//     height: 0px;
//     border-left: 5px solid transparent;
//     border-right: 5px solid transparent;
//     border-top: 8px solid #ccc; /* Adjust color as needed */
//     vertical-align: middle;
//     margin-left: 5px; /* Adjust spacing as needed */
//     transition: transform 0.3s ease-in-out;
//   }

//   #profile-dropdown.open button:after {
//     /* Rotate arrow on open */
//     transform: translateY(-100%); /* Adjust rotation based on dropdown content height */
//   }

//   #dropdown-content {
//     display: none;
//     position: absolute;
//     background-color: #fff;
//     min-width: 150px; /* Adjust minimum width as needed */
//     box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
//     z-index: 1; /* Ensure dropdown is above other elements */
//     padding: 10px; /* Inner padding for options */
//   }

//   #profile-dropdown.open #dropdown-content {
//     display: block; /* Show dropdown content on open */
//   }

//   #link {
//     color: black; /* Style option text */
//     text-decoration: none;
//     display: block; /* Make options full width */
//     padding: 5px 10px; /* Padding for each option */
//   }

//   #link {
//     background-color: #f1f1f1; /* Highlight option on hover */
//   }
