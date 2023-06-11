import { Month, months } from "../utils/utils";
import "../css/MonthSelector.sass";
import ListSelector from "./ListSelector";

interface MonthSelectorProps {
  value: Month;
  onMonthSelected: (month: Month) => void;
}

export default function MonthSelector({
  value,
  onMonthSelected,
}: MonthSelectorProps) {
  return (
    <>
      <ListSelector
        labels={months.map((month) => month.str)}
        value={value.str}
        onItemSelected={(_, index) => onMonthSelected(Month.fromNumber(index as number))}
      />
    </>
  );
}
