import "./App.css";
import { ReactQueryDevtools } from "react-query/devtools";
import Homepage from "./components/Homepage";

function App() {
  return (
    <>
      <div className="App">
        <Homepage></Homepage>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
