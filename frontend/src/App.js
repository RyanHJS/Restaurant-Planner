import { Routes, Route } from "react-router-dom";

// Page imports
import Home from "./pages/Home";
import Signup from "./components/form/Signup";
import Login from "./components/form/Login";

// test
import PlaceSearch from "./pages/test/PlaceSearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test/searchplace" element={<PlaceSearch />} />
    </Routes>
  );
}

export default App;
