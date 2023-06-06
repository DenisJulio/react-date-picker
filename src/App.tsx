import DatePicker from "./components/Datepicker";

function App() {

  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center">
        <DatePicker onDateSelected={(d) => console.log(d)}/>
      </div>
    </>
  );
}

export default App;
