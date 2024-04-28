import { ChangeEvent } from 'react';

type InputProps = {
  type: 'text' | 'email' | 'password';
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  onClick?: () => void;
  inputMode?: 'text' | 'numeric';
  disabled?: boolean;
  readOnly?: boolean;
  isBold?: boolean;
  unit?: string;
};

export const Input: React.FC<InputProps> = (props) => {
  const {
    type,
    value,
    onChange,
    label,
    placeholder,
    onClick,
    inputMode = 'text',
    disabled = false,
    readOnly = false,
    isBold = false,
    unit,
  } = props;
  return (
    <div className="flex flex-col justify-center">
      <label
        htmlFor={label}
        className={`${isBold ? 'font-bold' : 'font-normal'}`}
      >
        {label}
      </label>
      <div className="flex items-center w-full">
        <input
          value={value}
          type={type}
          id={label}
          onChange={onChange}
          onClick={onClick && onClick}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
          inputMode={inputMode}
          className="mt-1 py-2 px-3 w-full bg-white border-solid border-2 rounded"
        />
        {unit && <span className="block ml-2">{unit}</span>}
      </div>
    </div>
  );
};

type TextAreaProps = {
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  placeholder: string;
  isBold?: boolean;
  cols?: number;
};

export const TextArea: React.FC<TextAreaProps> = (props) => {
  const { value, onChange, label, placeholder, isBold, cols = 20 } = props;
  return (
    <div className="flex flex-col justify-center">
      <label
        htmlFor={label}
        className={`${isBold ? 'font-bold' : 'font-normal'}`}
      >
        {label}
      </label>
      <textarea
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        cols={cols}
        className="mt-1 py-2 px-3 h-44 resize-none border-solid border-2 rounded"
      />
    </div>
  );
};
