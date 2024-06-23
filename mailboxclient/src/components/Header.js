import Button from "./elements/Button";
import Heading from "./elements/Heading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/userSlice";
import userSlice from "../redux/userSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  return (
    <div className="container d-flex justify-content-between m-1">
      <Heading
        onClick={() => {
          console.log("NAVIGATION");
          navigate("/");
        }}
        heading="MailBox"
      />
      <Button
        context="Create Mail"
        className="btn btn-primary"
        onClick={() => {
          navigate("/mail");
        }}
      />
      {userReducer.token ? (
        <Button
          context="Logout"
          className="btn btn-primary"
          onClick={() => {
            console.log("READY TO LOGOUT");
            dispatch(setLogout());
          }}
        />
      ) : (
        <Button
          context="Login"
          className="btn btn-primary"
          onClick={() => {
            navigate("/login");
          }}
        />
      )}
    </div>
  );
};

export default Header;
