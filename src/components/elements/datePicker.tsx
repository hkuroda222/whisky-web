"use client";
import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";
import DatePicker, {
  type ReactDatePickerProps,
  registerLocale,
} from "react-datepicker";
import { ja } from "date-fns/locale/ja";

registerLocale("ja", ja);

const CustomInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = forwardRef(
  (
    props: InputHTMLAttributes<HTMLInputElement>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return <input {...props} ref={ref} readOnly />;
  }
);
CustomInput.displayName = "CustomInput";

export const DatePickerInput: React.FC<ReactDatePickerProps> = (props) => {
  return (
    <DatePicker
      {...props}
      locale="ja"
      dateFormat="yyyy年MM月dd日"
      calendarStartDay={1}
      maxDate={new Date()}
      showYearDropdown
      scrollableYearDropdown
      className="py-2 px-3 w-full border-solid border-2 rounded"
      customInput={<CustomInput />}
    />
  );
};
