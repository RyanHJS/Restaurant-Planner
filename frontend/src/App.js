import { Routes, Route } from "react-router-dom";

// Page imports
import Home from "./pages/Home";

// test
import PlaceSearch from "./pages/test/PlaceSearch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test/searchplace" element={<PlaceSearch />} />
    </Routes>
  );
}

export default App;
