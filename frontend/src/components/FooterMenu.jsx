import { Link } from "react-router-dom";
// need to add styling

const FooterMenu = () => {
    return (
        <>
            <footer
                className="footer"
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignContent: "center",
                    alignItems: "center",
                    fontSize: "medium",
                }}
            >
                <p>© 2024 Actualize</p> {/* Replace with your company name */}
                {/* Add social media icons with anchor elements (replace with your links) */}
                <ul
                    style={{
                        listStyle: "none",
                        display: "flex",
                    }}
                >
                    <li>
                        <Link to="/contact" style={{ marginLeft: "1rem" }}>
                            Contact Us
                        </Link>
                        {/* Link to contact page with message send feature/feedback form */}
                    </li>
                    <li>
                        <Link to="/faq" style={{ marginLeft: "1rem" }}>
                            FAQ
                        </Link>{" "}
                        {/* Link to FAQ page*/}
                    </li>
                    <li>
                        <Link to="/policies" style={{ marginLeft: "1rem" }}>
                            Policies
                        </Link>
                        {/* Link to policies page fro data collection disclaimer*/}
                    </li>
                </ul>
            </footer>
        </>
    );
};

export default FooterMenu;
