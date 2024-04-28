'use client';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale/ja';

registerLocale('ja', ja);

type SelectDateProps = {
  startDate: Date;
  onChange: (e: Date) => void;
};
export const SelectDate: React.FC<SelectDateProps> = (props) => {
  const { startDate, onChange } = props;
  return (
    <DatePicker
      selected={startDate}
      locale="ja"
      onChange={onChange}
      dateFormat="yyyy年MM月dd日"
      calendarStartDay={1}
      className="py-2 px-3 w-full border-solid border-2 rounded"
    />
  );
};
