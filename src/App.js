import "./App.css";
import { Route, Routes } from "react-router-dom";
import Addtournament from "./Components/Addtournament";
import Navbar from "./Components/Navbar";
import Detail from "./Components/Detail";
import DataProvider from "./Components/Context/Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <DataProvider>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Addtournament/>} />
          <Route path="/Tournament/:id" element={<Detail />} />
        </Routes>

      </div>
      <ToastContainer />
    </DataProvider>
  );
}

export default App;
