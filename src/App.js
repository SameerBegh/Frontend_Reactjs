import "./App.css";
import { Route, Routes } from "react-router-dom";
import Create_tournament from "./Components/Create_tournament";
import Navbar from "./Components/Navbar";
import Detail from "./Components/Detail";
import DataProvider from "./Components/Context/Context";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Create_tournament />} />
          <Route path="/Tournament/:id" element={<Detail />} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
