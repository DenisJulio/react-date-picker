import { useEffect, useState } from "react";
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
import MonthSelector from "./MonthSelector";
import { Month } from "../utils/utils";
import YearSelector from "./YearSelector";
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
} from "react-icons/md";

interface DatepickerProps {
  minYear: number;
  maxYear: number;
  onDateSelected: (date: Date) => void;
}

export default function DatePicker({
  minYear,
  maxYear,
  onDateSelected,
}: DatepickerProps) {
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
  const [month, setMonth] = useState<Month>(
    Month.fromNumber(currentDate.getMonth())
  );
  const [year, setYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDateStr, setSelectedDateStr] = useState<string | undefined>(
    undefined
  );
  const [nextYearLimitReached, setNextYearLimitReached] = useState(
    () => year === maxYear && month.id === 11
  );
  const [previousYearLimitReached, setPreviousYearLimitReached] = useState(
    () => year === minYear && month.id === 0
  );

  useEffect(
    () => setNextYearLimitReached(year === maxYear && month.id === 11),
    [maxYear, month, nextYearLimitReached, year]
  );
  useEffect(
    () => setPreviousYearLimitReached(year === minYear && month.id === 0),
    [minYear, month, previousYearLimitReached, year]
  );

  const arrowButtonStyle = `m-2 p-2 border-[1px] rounded-full`;
  const footerButtonStyle =
    "px-4 py-2 uppercase text-blue-500 rounded-full hover:bg-gray-200";

  const datePickerHeader = (): string =>
    selectedDate
      ? `${dayOfTheWeekToStr(selectedDate.getDay())}, ${monthToStr(
          selectedDate.getMonth()
        )} ${selectedDate.getDate()}`
      : "";

  const onSelectDateHandler = (date: Date) => setSelectedDate(date);

  const increaseMonth = () => {
    if (month.id === 11) {
      if (year === maxYear) {
        setNextYearLimitReached(!nextYearLimitReached);
        return;
      }
      setMonth(Month.fromNumber(0));
      setYear((year) => year + 1);
    } else {
      setMonth((month) => Month.fromNumber(month.id + 1));
    }
  };

  const decreaseMonth = () => {
    if (month.id === 0) {
      if (year === minYear) {
        setPreviousYearLimitReached(!previousYearLimitReached);
        return;
      }
      setMonth(Month.fromNumber(11));
      setYear((year) => year - 1);
    } else {
      setMonth((month) => Month.fromNumber(month.id - 1));
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
              <div className="flex flex-col w-min border-[1px] rounded-2xl bg-white filter-none">
                <div className="mx-2 my-3 px-1">
                  <span className="block text-sm">
                    {selectedDate?.getFullYear() ?? ""}
                  </span>
                  <span className="block text-xl">{datePickerHeader()}</span>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className={`${arrowButtonStyle} ${
                      previousYearLimitReached
                        ? "border-[rgb(184,184,184,0.38)]"
                        : "border-gray-500"
                    }`}
                    onClick={decreaseMonth}
                    disabled={previousYearLimitReached}
                  >
                    <MdArrowBackIosNew
                      color={
                        previousYearLimitReached ? "rgb(184,184,184,0.38)" : "rgb(107, 114, 128)"
                      }
                    />
                  </button>
                  <div className="border-[1px] p-1 border-gray-500 flex rounded-full">
                    <MonthSelector
                      value={month}
                      onMonthSelected={(month) => setMonth(month)}
                    />
                    <YearSelector
                      value={year}
                      minYear={minYear}
                      maxYear={maxYear}
                      onYearSelected={(year) => setYear(year)}
                    />
                  </div>
                  <button
                    className={`${arrowButtonStyle} ${
                      nextYearLimitReached
                        ? "border-[rgb(184,184,184,0.38)]"
                        : "border-gray-500"
                    }`}
                    onClick={increaseMonth}
                    disabled={nextYearLimitReached}
                  >
                    <MdArrowForwardIos
                      color={
                        nextYearLimitReached ? "rgb(184,184,184,0.38)" : "rgb(107, 114, 128)"
                      }
                    />
                  </button>
                </div>
                <CalendarView
                  year={year}
                  month={month.id}
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
