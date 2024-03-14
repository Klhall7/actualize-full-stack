import { Link } from "react-router-dom";
// need to add styling

const FooterMenu = () => {
    return (
        <>
            <footer className="footer">
                <p>© 2024 Actualize</p> {/* Replace with your company name */}
                {/* Add social media icons with anchor elements (replace with your links) */}
                <ul>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                        {/* Link to contact page with message send feature/feedback form */}
                    </li>
                    <li>
                        <Link to="/faq">FAQ</Link> {/* Link to FAQ page*/}
                    </li>
                    <li>
                        <Link to="/policies">Policies</Link>
                        {/* Link to policies page fro data collection disclaimer*/}
                    </li>
                </ul>
            </footer>
        </>
    );
};

export default FooterMenu;
