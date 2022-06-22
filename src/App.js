import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Home from "./components/pages/Home";
import Auth from "./components/pages/Auth";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </RecoilRoot>
    </Router>
  );
}

export default App;
