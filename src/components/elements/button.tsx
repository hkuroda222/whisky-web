type ButtonProps = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
};
export const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, text, disabled } = props;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full p-2 h-12 rounded-md border-solid border-2"
    >
      {text}
    </button>
  );
};
