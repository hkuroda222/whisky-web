import { ChangeEvent } from 'react';

type InputProps = {
  type: 'text' | 'email' | 'password';
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
};

export const Input: React.FC<InputProps> = (props) => {
  const { type, value, onChange, label, placeholder } = props;
  return (
    <div className="flex flex-col justify-center">
      <label htmlFor={label}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={label}
        placeholder={placeholder}
        className="mt-1 py-2 px-3 border-solid border-2 rounded"
      />
    </div>
  );
};
