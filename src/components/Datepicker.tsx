import { useState } from "react";
import CalendarView from "./CalendarView";
import {
  FloatingFocusManager,
  FloatingOverlay,
  useClick,
  useDismiss,
  useFloating,
  useId,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import calendarIcon from "../assets/icon.svg";

interface DatepickerProps {
  onDateSelected: (date: Date) => void;
}

export default function DatePicker({ onDateSelected }: DatepickerProps) {
  // floating-ui setup -----------------------------
  const [isOpen, setIsOpen] = useState(false);

  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const labelId = useId();
  const descriptionId = useId();

  // ------------------------------------------------

  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDateStr, setSelectedDateStr] = useState<string | undefined>(
    undefined
  );

  const arrowButtonStyle = "m-2 px-2 bg-gray-200 rounded-full";
  const footerButtonStyle =
    "px-4 py-2 uppercase text-sm text-blue-500 hover:bg-gray-200";

  const datePickerHeader = (): string =>
    selectedDate
      ? `${dayOfTheWeekToStr(selectedDate.getDay())}, ${monthToStr(
          selectedDate.getMonth()
        )} ${selectedDate.getDate()}`
      : "";

  const onSelectDateHandler = (date: Date) => setSelectedDate(date);

  const increaseMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((year) => year + 1);
    } else {
      setMonth((month) => month + 1);
    }
  };

  const decreaseMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((year) => year - 1);
    } else {
      setMonth((month) => month - 1);
    }
  };

  const onOkClickedHandler = () => {
    setSelectedDateStr(formatedDateStr(selectedDate as Date));
    onDateSelected(selectedDate as Date);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <input
          type="text"
          className="pr-12 pl-2 py-2 border border-gray-300 rounded-md"
          placeholder="Your text here"
          value={selectedDateStr}
        />
        <button
          className="absolute top-0 right-0 w-12 h-full flex items-center justify-center border border-transparent rounded-md"
          ref={refs.setReference}
          {...getReferenceProps()}
        >
          <img src={calendarIcon} alt="Icon" className="w-6 h-6" />
        </button>
      </div>
      {isOpen && (
        <FloatingOverlay
          lockScroll
          className="flex items-center justify-center bg-gray-200"
        >
          <FloatingFocusManager context={context}>
            <div
              ref={refs.setFloating}
              aria-labelledby={labelId}
              aria-describedby={descriptionId}
              {...getFloatingProps()}
            >
              <div className="flex flex-col w-min border-[1px] shadow-lg rounded-lg bg-white filter-none">
                <div className="mx-2 my-3 px-1">
                  <span className="block text-sm">
                    {selectedDate?.getFullYear() ?? ""}
                  </span>
                  <span className="block text-xl">{datePickerHeader()}</span>
                </div>
                <div className="flex items-center justify-center">
                  <button className={arrowButtonStyle} onClick={decreaseMonth}>
                    &lt;
                  </button>
                  <select
                    name="months"
                    onChange={(event) => setMonth(Number(event.target.value))}
                    value={month}
                  >
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                  </select>
                  <input
                    className="ml-3 w-16"
                    type="number"
                    value={year}
                    onChange={(event) => setYear(Number(event.target.value))}
                    min="1900"
                    max="2100"
                  ></input>
                  <button className={arrowButtonStyle} onClick={increaseMonth}>
                    &gt;
                  </button>
                </div>
                <CalendarView
                  year={year}
                  month={month}
                  selectedDate={selectedDate}
                  onDateClicked={onSelectDateHandler}
                />
                <div className="flex items-center justify-between mx-2 mb-2 mt-4">
                  <button className={footerButtonStyle}>Clear</button>
                  <button
                    className={footerButtonStyle}
                    onClick={onOkClickedHandler}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </>
  );
}

function formatedDateStr(date: Date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

function monthToStr(num: number) {
  switch (num) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
}

function dayOfTheWeekToStr(num: number) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}
