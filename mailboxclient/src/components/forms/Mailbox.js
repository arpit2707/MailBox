import React, { useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
// import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
// import { backendURL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { API } from "../../constants/api-config";
import axios from "axios";
import Button from "../elements/Button";

const MailBox = () => {
  const navigate = useNavigate();
  const emailTo = useRef();
  const subject = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const sendMailRequest = async (content) => {
    try {
      console.log(
        content.blocks
          .map((item) => item.text)
          .join("\n")
          .toString()
      );
      const formObj = {
        to: emailTo.current.value,
        content: content.blocks.map((item) => item.text).join("\n"),
        subject: subject.current.value,
      };

      console.log(formObj, localStorage.getItem("token"));

      const response = await axios.post(`${API}` + "/api/mail/sendmail", {
        token: localStorage.getItem("token"),
        subject: formObj.subject,
        receiverEmail: formObj.to,
        mainContent: formObj.content,
      });
      console.log("RESPONSESS", response);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const onclickSend = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    console.log("Raw Content State:", rawContentState);

    sendMailRequest(rawContentState);
  };

  const onclickBack = (e) => {
    e.preventDefault();
    navigate("/inbox");
  };

  return (
    <div className="conatiner d-flex flex-column justify-center items-center mt-3">
      <Button
        className="align-self-start m-2 btn btn-primary"
        onClick={onclickBack}
        context="Back"
      ></Button>

      <div className="w-9/12 flex h-svh  mt-2 p-2  border">
        <div className="flex w-full">
          <label>To:</label>{" "}
          <input ref={emailTo} className="w-full mx-5" type="text"></input>
        </div>
        <hr className="w-full p-[1px]"></hr>
        <div className="flex w-full">
          <input
            ref={subject}
            type="text"
            className="w-full mx-5"
            placeholder="Subject for the mail"
          ></input>
        </div>
        <hr className="w-full"></hr>
        <div className="p-2 bg-slate-200 h-dvh flex flex-col align-bottom overflow-y-scroll max-h-[500px]">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            className="h-screen max-h-[500px] overflow-y-scroll"
          />
        </div>
        <button className="p-2 bg-blue-400" onClick={onclickSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MailBox;
