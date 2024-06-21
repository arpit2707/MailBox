import { useState, useEffect, act } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../constants/api-config";
import InboxTags from "./InboxTags";
import { PiDotFill } from "react-icons/pi";
import { BiArrowBack } from "react-icons/bi";
import { FaReply } from "react-icons/fa";
import { BsForwardFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

const InboxMail = () => {
  const [mailactive, setMailActive] = useState(false);
  const [mails, setMails] = useState([]);
  const [activeMail, setActiveMail] = useState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log("token", token);
  const fetchmails = async () => {
    const response = await axios.post(`${API}/api/mail/fetchmail`, {
      token: token,
    });
    setMails((prevState) => response.data.emails);
  };
  useEffect(() => {
    fetchmails();
  }, []);

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
              mails.map(
                (item) => (
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
                )

                // <div className="col-10 d-flex justify-content-between">
                //   <div className="col-2">
                //     {/* <span style={{ color: "blue" }}>.</span> */}
                //     <PiDotFill className="col-1" />
                //     <input className="col-1" type="checkbox" />
                //   </div>
                //   <label className="col-2 fw-bolder ">title</label>
                //   <p className="col-5 fw-bolder">descriptions</p>
                //   <span className="col-1">{new Date().toString().slice(19, 25)}</span>
                // </div>
              )}
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
            <MdDeleteForever className="ms-4" />
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
