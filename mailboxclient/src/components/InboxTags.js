import { useSelector, useDispatch } from "react-redux";
import { setSelectedBox } from "../redux/mailSlice";
const InboxTags = (props) => {
  const dispatch = useDispatch();
  const { unreadCount } = useSelector((state) => state.mail);
  const selectBox = (box) => {
    dispatch(setSelectedBox({ selectedBox: box }));
  };
  return (
    <div className="d-flex flex-column">
      <label
        onClick={() => {
          selectBox("compose");
        }}
        className=" bg-primary border-2 rounded w-100  text-black p-1 m-1"
      >
        Compose Mail
      </label>
      <label
        onClick={() => {
          selectBox("Inbox");
        }}
        className="bg-dark border-2 rounded w-100  text-white p-1 m-1"
      >
        Inbox
      </label>
      <label
        onClick={() => {
          selectBox("Unread");
        }}
        className="bg-dark border-2 w-100 rounded text-white p-1 m-2"
      >
        Unread{" "}
        <span
          style={{ backgroundColor: "blue", color: "yellow" }}
          className="p-1 border-solid rounded"
        >
          {` ` + unreadCount}
        </span>
      </label>
      <label
        onClick={() => {
          selectBox("Starred");
        }}
        className="bg-dark border-2 w-100 rounded text-white p-1 m-2"
      >
        Starred
      </label>
      <label
        onClick={() => {
          selectBox("Draft");
        }}
        className="bg-dark border-2 w-100 rounded text-white p-1 m-2"
      >
        Draft
      </label>
      <label
        onClick={() => {
          selectBox("Sent");
        }}
        className="bg-dark border-2 w-100 rounded text-white p-1 m-2"
      >
        Sent
      </label>
    </div>
  );
};
export default InboxTags;
