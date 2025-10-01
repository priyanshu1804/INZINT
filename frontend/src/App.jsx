import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import { useEffect,useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
function App(){
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  useEffect(() => {
    const handleStorage = () => setIsAuth(!!localStorage.getItem("token"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
export default App;
