import { AuthProvider } from "./AuthContext";
import Routes from "./routes/Routes";
import './styles/App.css';
import 'react-tooltip/dist/react-tooltip.css'

function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;

