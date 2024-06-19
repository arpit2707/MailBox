import Button from "./elements/Button";
import Heading from "./elements/Heading";
import { useNavigate } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Header = () => {
  const navigate = useNavigate();
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
    </div>
  );
};

export default Header;
