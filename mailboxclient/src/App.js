import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Signup from "./components/forms/Signup";
import Login from "./components/forms/Login";
import Home from "./components/Home";
import MailBox from "./components/forms/Mailbox";
import { useEffect } from "react";
import { setToken } from "./redux/userSlice";

function App() {
  const userReducer = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const tokens = localStorage.getItem("token");
    if (tokens) {
      dispatch(setToken({ token: tokens }));
    }
  }, []);
  return (
    <Router>
      <div className="App container ">
        <Header />
        <Routes>
          <Route
            path="/"
            element={!userReducer.token ? <Signup /> : <Home />}
          />
          <Route
            path="/login"
            element={!userReducer.token ? <Login /> : <Home />}
          />

          <Route
            path="/mail"
            element={!userReducer.token ? <Login /> : <MailBox />}
          />
          <Route
            path="/home"
            element={!userReducer.token ? <Login /> : <Home />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
