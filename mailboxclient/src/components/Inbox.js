import { useEffect, useState } from "react";
import InboxTags from "./InboxTags";
import InboxMail from "./InboxMails";
const Inbox = () => {
  return (
    <div className="container mt-5">
      <InboxMail />
    </div>
  );
};
export default Inbox;
