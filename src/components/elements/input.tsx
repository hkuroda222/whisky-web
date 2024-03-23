import { ChangeEvent } from 'react';

type InputProps = {
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
};

export const Input: React.FC<InputProps> = (props) => {
  const { value, onChange, label, placeholder } = props;
  return (
    <div className="flex flex-col justify-center">
      <label htmlFor={label}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type="text"
        id={label}
        placeholder={placeholder}
        className="mt-1"
      />
    </div>
  );
};
