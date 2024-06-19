const Button = (props) => {
  const { context, type, onClick, className } = props;
  return (
    <button className={className} type={type} onClick={onClick}>
      {context}
    </button>
  );
};
export default Button;
