import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AdminPage } from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quan-ly-xe" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
