import ListSelector from "./ListSelector";

interface YearSelectorProps {
  value: number;
  minYear: number;
  maxYear: number;
  onYearSelected: (year: number) => void;
}

export default function YearSelector({
  value,
  minYear,
  maxYear,
  onYearSelected,
}: YearSelectorProps) {
  const yearsLabels = Array.from({ length: maxYear - minYear + 1 }, (_, i) =>
    String(i + minYear)
  );

  return (
    <ListSelector
      value={String(value)}
      labels={yearsLabels}
      onItemSelected={(label) => onYearSelected(Number(label))}
      tw="w-[5rem]"
    />
  );
}
