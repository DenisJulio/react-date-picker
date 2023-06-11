import { useState } from "react";
import DatePicker from "./components/Datepicker";
import { Month } from "./utils/utils";

function App() {
  const [option, setOption] = useState(Month.June);

  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center">
        <DatePicker
          minYear={2023}
          maxYear={2023}
          onDateSelected={(d) => console.log(d)}
        />
      </div>
    </>
  );
}

export default App;
