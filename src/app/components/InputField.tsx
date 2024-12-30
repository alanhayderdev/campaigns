import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

type Props = {
  label?: string;
  type?: string;
  placeholder?: string;
  icon?: any;
  textarea?: boolean;
  fieldValue?: any;
  onChange?: (value: any) => void;
};

export default function InputField({
  label,
  type,
  placeholder,
  icon,
  textarea,
  fieldValue,
  onChange,
}: Props) {
  const sharedClasses = `border border-gray-300 outline-0 w-full px-3 py-3 rounded bg-zinc-50
                    text-sm font-medium text-neutral-950 outline-none leading-none 
                    placeholder-[rgba(19,19,19,0.5)] focus:border-blue-900`;

  const [showPicker, setShowPicker] = useState(false);
  const [dateRange, setDateRange] = useState(
    fieldValue?.startDate && fieldValue?.endDate
      ? fieldValue
      : {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        }
  );

  const handleSelect = (ranges: any) => {
    setDateRange({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: "selection",
    });
    onChange &&
      onChange({
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate,
        key: "selection",
      });
  };

  const [value, setValue] = useState<string>(fieldValue || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <>
      <div className="mb-4 w-full">
        {label && (
          <label className="text-sm font-medium text-zinc-400 mb-1 block">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="text-sm text-[rgba(19,19,19,0.5)] absolute left-3 top-[48%] -translate-y-1/2">
              <FontAwesomeIcon icon={icon} />
            </span>
          )}
          {textarea ? (
            <textarea
              placeholder={placeholder || ""}
              className={`${sharedClasses} h-20 resize-none`}
            ></textarea>
          ) : type === "date" ? (
            <div className="relative">
              <div
                className={`flex items-center justify-between ${sharedClasses} pl-8`}
                onClick={() => setShowPicker((prev) => !prev)}
              >
                <span className="text-[rgba(19,19,19,0.5)] font-medium">
                  {`${format(dateRange.startDate, "dd MMM yyyy")} - ${format(
                    dateRange.endDate,
                    "dd MMM yyyy"
                  )}`}
                </span>
                <span className="text-sm text-[rgba(19,19,19,0.5)] absolute left-3 top-[48%] -translate-y-1/2 text-sm">
                  <FontAwesomeIcon icon={faCalendar} />
                </span>
              </div>

              {showPicker && (
                <div className="max-w-[300px] md:max-w-full w-full overflow-auto md:overflow-visible absolute z-50 mt-2 bg-white border border-gray-300 rounded shadow-lg">
                  <DateRangePicker
                    ranges={[dateRange]}
                    onChange={handleSelect}
                    rangeColors={["#4F46E5"]}
                  />
                </div>
              )}
            </div>
          ) : (
            <input
              type={type}
              placeholder={placeholder || ""}
              value={value}
              onChange={handleChange}
              className={`${sharedClasses} ${icon ? "pl-8" : "pl-3"}`}
            />
          )}
        </div>
      </div>
    </>
  );
}
