import { Month, months } from "../utils/utils";

interface MonthSelectorProps {
  onMonthSelected: (month: Month) => void;
}

export default function MonthSelector({ onMonthSelected }: MonthSelectorProps) {
  const cellStyle = "p-2 text-center hover:bg-gray-200 cursor-pointer";

  return (
    <>
      <table>
        <tr>
          {months
            .filter((_, i) => i < 4)
            .map((month) => (
              <td className={cellStyle} onClick={() => onMonthSelected(month)}>{month.short}</td>
            ))}
        </tr>
        <tr>
          {months
            .filter((_, i) => i >= 4 && i < 8)
            .map((month) => (
              <td className={cellStyle} onClick={() => onMonthSelected(month)}>{month.short}</td>
            ))}
        </tr>
        <tr>
          {months
            .filter((_, i) => i >= 8)
            .map((month) => (
              <td className={cellStyle} onClick={() => onMonthSelected(month)}>{month.short}</td>
            ))}
        </tr>
      </table>
    </>
  );
}
