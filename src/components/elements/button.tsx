type ButtonProps = {
  onClick: any;
  text: string;
};
export const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, text } = props;
  return (
    <button onClick={onClick} className="border-solid border-2 p-2">
      {text}
    </button>
  );
};
