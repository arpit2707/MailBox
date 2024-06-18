const Button = (props) => {
  const { context, type, onClick } = props;
  return (
    <button type={type} onClick={onClick}>
      {context}
    </button>
  );
};
export default Button;
