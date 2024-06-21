const InboxTags = (props) => {
  return (
    <div className="d-flex flex-column">
      <label className=" bg-primary border-2 rounded w-100  text-black p-1 m-1">
        Compose Mail
      </label>
      <label className="bg-dark border-2 rounded w-100  text-white p-1 m-1">
        Inbox
      </label>
      <label className="bg-dark border-2 w-100 rounded text-white p-1 m-2">
        Unread
      </label>
      <label className="bg-dark border-2 w-100 rounded text-white p-1 m-2">
        Starred
      </label>
      <label className="bg-dark border-2 w-100 rounded text-white p-1 m-2">
        Draft
      </label>
      <label className="bg-dark border-2 w-100 rounded text-white p-1 m-2">
        Sent
      </label>
    </div>
  );
};
export default InboxTags;
