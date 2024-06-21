import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Signup from "./components/forms/Signup";
import Login from "./components/forms/Login";
import Home from "./components/Home";
import MailBox from "./components/forms/Mailbox";
function App() {
  const userReducer = useSelector((state) => state.user);
  return (
    <Router>
      <div className="App container ">
        <Header />
        <Routes>
          {!userReducer.token ? (
            <>
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <Route path="/mail" element={<MailBox />} />
          )}
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
