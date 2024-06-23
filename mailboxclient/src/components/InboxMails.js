import { useState, useEffect, act } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API } from "../constants/api-config";
import InboxTags from "./InboxTags";
import { PiDotFill } from "react-icons/pi";
import { BiArrowBack } from "react-icons/bi";
import { FaReply } from "react-icons/fa";
import { BsForwardFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { setUnreadCount } from "../redux/mailSlice";
import socket from "../socket/socketio";
import { jwtDecode } from "jwt-decode";
import useFetch from "../custom-hooks/Fetch";

const InboxMail = () => {
  const [mailactive, setMailActive] = useState(false);
  const dispatch = useDispatch();
  const [mails, setMails] = useState([]);
  const [activeMail, setActiveMail] = useState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const userReducer = useSelector((state) => state.user);
  const mailReducer = useSelector((state) => state.mail);
  console.log("token", token);
  const { data, loading, error } = useFetch(
    `${API}/api/mail/fetchmail`,
    "post",
    { token: token }
  );

  useEffect(() => {
    if (data) {
      setMails(data.emails);
      dispatch(setUnreadCount({ unread: data.count }));
    }
  }, [data, dispatch]);
  const fetchmails = async () => {
    const response = await axios.post(`${API}/api/mail/fetchmail`, {
      token: token,
    });
    setMails((prevState) => response.data.emails);
    dispatch(setUnreadCount({ unread: response.data.count }));
  };
  const sentmails = async () => {
    const response = await axios.post(`${API}/api/mail/sentmail`, {
      token: token,
    });
    console.log("CCAMTE TO SET SENT", response);
    setMails((prevState) => response.data.emails);
  };

  const unreadMails = async () => {
    const response = await axios.post(`${API}/api/mail/unreadmail`, {
      token: token,
    });
    setMails((prevState) => response.data.emails);
    dispatch(setUnreadCount({ unread: response.data.count }));
  };
  useEffect(() => {
    if (mailReducer.selectedBox == "compose") {
      navigate("/mail");
    } else if (mailReducer.selectedBox == "Inbox") {
      fetchmails();
    } else if (mailReducer.selectedBox == "Unread") {
      unreadMails();
    } else if (mailReducer.selectedBox == "Starred") {
    } else if (mailReducer.selectedBox == "Draft") {
    } else if (mailReducer.selectedBox == "Sent") {
      sentmails();
    }
  }, [mailReducer.selectedBox]);

  const handleNewEmail = () => {
    fetchmails();
  };
  console.log(userReducer);
  useEffect(() => {
    const decodedToken = jwtDecode(token);
    console.log(`newemail${decodedToken.userId}`);
    socket.on(`newemail${decodedToken.userId}`, handleNewEmail);
    return () => {
      socket.off(`newemail${decodedToken.userId}`, handleNewEmail);
      socket.close();
    };
  }, [socket, token]);
  const deletMail = async () => {
    const response = await axios.post(`${API}/api/mail/deletemail`, {
      token: token,
      mail: activeMail,
    });
  };

  const markRead = async (item) => {
    console.log(item);
    const response = await axios.post(`${API}/api/mail/readmail`, {
      token: token,
      mail: item,
    });
    fetchmails();
  };

  return (
    <div className="row">
      <div className="col-lg-2  justify-content-center">
        <InboxTags />
      </div>
      <div className="col-lg-10">
        <table className=" table table-inbox table-hover">
          <tbody>
            {!mailactive &&
              mails &&
              mails.map((item) => (
                <tr
                  onClick={() => {
                    setActiveMail((prevState) => item);
                    setMailActive((prevState) => true);
                    markRead(item);
                  }}
                >
                  <td>
                    <input type="checkbox" />
                  </td>

                  <td>{!item.read ? <PiDotFill /> : "  "}</td>

                  <td>{item.subject}</td>
                  <td>{item.mainContent}</td>
                  <td></td>
                  <td>March 15</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {mailactive && (
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <BiArrowBack
                className="ms-4"
                onClick={() => {
                  setMailActive((prevState) => false);
                }}
              />
              <span
                className="ms-4"
                onClick={() => {
                  setMailActive((prevState) => false);
                }}
              >
                Back
              </span>
              <FaReply className="ms-4" />
              <BsForwardFill className="ms-4" />
            </div>
            <MdDeleteForever onClick={deletMail} className="ms-4" />
          </div>
          <label className="align-self-start">Text Message</label>
          <div className="border border-dark rounded">
            <div className="d-flex justify-content-between p-4">
              <label>Email</label>
              <span>{new Date().toString().slice(0, 21)}</span>
            </div>
            <div>
              <p>{`kkddvkjdf kkddvkjdf kkddvkjdf kkddvkjdf kkddvkjdfkkddvkjdfkkddvkjdfkkddvkjdf kkddvkjdf kkddvkjdf kkddvkjdf kkddvkjdfkkddvkjdf kkddvkjdf kkddvkjdfkkddvkjdfkkddvkjdfkkddvkjdfkkddvkjdfkkddvkjdf sddjvsdkjv`}</p>
            </div>
            <div className="d-flex  align-items-center justify-content-center align-self-center">
              <BiArrowBack className="ms-4" />
              <span className="ms-4">Back</span>
              <FaReply className="ms-4" />
              <BsForwardFill className="ms-4" />
              <MdDeleteForever className="ms-4" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default InboxMail;
