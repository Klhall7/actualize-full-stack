import { Link } from "react-router-dom";
import { useState } from "react";

const HomeNav = () => {
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
            <ul id="ul-dropdown">
                <Link to="">
                    {" "}
                    {/* replace with path to about us page when setup */}
                    <li>About</li>
                </Link>
                <li>
                    <button type="button" onClick={toggleDropdown}>
                        Get Started
                    </button>
                    {dropdownOpen && (
                        <ul className="dropdown-options">
                            <Link to="/login">
                                <li>Login</li>
                            </Link>
                            <Link to="/register">
                                <li>Create Account</li>
                            </Link>
                        </ul>
                    )}
                </li>
            </ul>
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