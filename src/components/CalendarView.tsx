export default function CalendarView({
  year,
  month,
  selectedDate,
  onDateClicked,
}: CalendarViewProps) {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);

  const cellStyle =
    "m-2 p-1 min-w-[2.5em] h-[40px] min-h-[40px] max-h-0 max-w-0 text-center cursor-pointer rounded-full";
  const cellSelectedStyle = "hover:bg-blue-500 bg-blue-300";
  const cellUnselectedStyle = "hover:bg-gray-200";
  const headerStyle =
    "m-2 p-1 min-w-[2.5em] h-[40px] min-h-[40px] max-h-0 max-w-0 text-center";

  function onCellClickedHandler(event: React.MouseEvent<HTMLTableCellElement>) {
    onDateClicked(
      new Date(year, month, Number(event.currentTarget.textContent))
    );
  }

  const cellId = (day: number): string => `${year}-${month}-${day}`;

  const isSelectedCell = (day: number) =>
    selectedDate !== undefined &&
    selectedDate.getFullYear() === year &&
    selectedDate.getMonth() === month &&
    selectedDate.getDate() === day;

  const calendarRows = () => {
    let day = 1;
    const firstDay: number = startDate.getDay();
    const lastDay: number = endDate.getDate();
    const rows = [];
    let days = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0) {
          if (j < firstDay) {
            days.push(<td className="m-2 p-1 min-w-[2.5em] min-h-[40px] max-h-0 max-w-0"></td>);
            continue;
          } else if (j === firstDay) {
            days.push(
              <td
                key={cellId(day)}
                className={`${cellStyle} ${
                  isSelectedCell(day) ? cellSelectedStyle : cellUnselectedStyle
                }`}
                onClick={onCellClickedHandler}
              >
                {day}
              </td>
            );
            day++;
            continue;
          }
          days.push(
            <td
              key={cellId(day)}
              className={`${cellStyle} ${
                isSelectedCell(day) ? cellSelectedStyle : cellUnselectedStyle
              }`}
              onClick={onCellClickedHandler}
            >
              {day}
            </td>
          );
          day++;
          continue;
        }
        if (day > lastDay) {
          days.push(<td className="m-2 p-1 h-[40px] min-w-[2.5em] min-h-[40px] max-h-0 max-w-0"></td>);
          continue;
        }
        days.push(
          <td
            key={cellId(day)}
            className={`${cellStyle} ${
              isSelectedCell(day) ? cellSelectedStyle : cellUnselectedStyle
            }`}
            onClick={onCellClickedHandler}
          >
            {day}
          </td>
        );
        day++;
      }
      rows.push(days);
      days = [];
    }
    return rows;
  };

  return (
    <table className="mx-2">
      <thead>
        <tr>
          {weekDays.map((day) => {
            const dayStr = day.slice(0, 3);
            return (
              <th className={headerStyle} key={day}>
                {dayStr}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {calendarRows().map((row, index) => (
          <tr key={index}>{row}</tr>
        ))}
      </tbody>
    </table>
  );
}

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface CalendarViewProps {
  year: number;
  month: number;
  selectedDate: Date | undefined;
  onDateClicked: (date: Date) => void;
}
