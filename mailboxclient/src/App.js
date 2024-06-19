import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/forms/Signup";
import Login from "./components/forms/Login";
import Home from "./components/Home";
import MailBox from "./components/forms/Mailbox";
function App() {
  return (
    <Router>
      <div className="App container ">
        <Header />
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mail" element={<MailBox />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
