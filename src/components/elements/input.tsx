import { ChangeEvent } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

type InputProps = {
  type: 'text' | 'email' | 'password';
  value: string | number | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
          onChange={onChange && onChange}
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

type InputItemProps = {
  type: 'input' | 'textarea';
  label: string;
  placeholder: string;
  inputMode?: 'text' | 'numeric';
  isBold?: boolean;
  cols?: number;
  unit?: string;
};

type InputItemComponentProps<T extends FieldValues> = UseControllerProps<T> &
  InputItemProps;

export const InputItem = <T extends FieldValues>(
  props: InputItemComponentProps<T>
) => {
  const {
    type,
    label,
    placeholder,
    inputMode = 'text',
    isBold = false,
    cols = 20,
    unit,
    name,
    control,
    rules,
  } = props;
  const { field, fieldState } = useController<T>({ name, control, rules });
  const { error } = fieldState;

  return (
    <div className="flex flex-col justify-center">
      <label
        htmlFor={label}
        className={`${isBold ? 'font-bold' : 'font-normal'}`}
      >
        {label}
      </label>
      <div className="flex items-center w-full">
        {type === 'input' ? (
          <input
            type="text"
            id={label}
            placeholder={placeholder}
            inputMode={inputMode}
            {...field}
            className="mt-1 py-2 px-3 w-full bg-white border-solid border-2 rounded"
          />
        ) : (
          <textarea
            id={label}
            placeholder={placeholder}
            cols={cols}
            {...field}
            className="mt-1 py-2 px-3 h-44 w-full resize-none border-solid border-2 rounded"
          />
        )}
        {unit && <span className="block ml-2">{unit}</span>}
      </div>
      {error && (
        <div className="mt-2 h-4 w-full text-xs text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
};
