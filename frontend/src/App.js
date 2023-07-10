import { Routes, Route } from "react-router-dom";

// Page imports
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Access from "./pages/Access";

// test
import PlaceSearch from "./pages/test/PlaceSearch";
import Voting from "./pages/test/Voting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Access />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test/searchplace" element={<PlaceSearch />} />
      <Route path="/test/Voting" element={<Voting />} />
    </Routes>
  );
}

export default App;
