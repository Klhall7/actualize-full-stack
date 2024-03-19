import { AuthProvider } from "./AuthContext";
import Routes from "./routes/Routes";

function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;

