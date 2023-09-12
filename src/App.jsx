import Login from "./interfaces/general/Login";
import Register from "./interfaces/general/Register";
import Hub from "./interfaces/general/Hub";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/styletemp.css";
import "./css/popup.css";
import Test from "./Test";

function App() {
  try {
    return (
      <>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/login" exact element={<Login toast={toast} />} />
            <Route path="/register" exact element={<Register toast={toast} />} />
            <Route path="/*" exact element={<Hub toast={toast} />} />
            <Route path="/test" exact element={<Test toast={toast} />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default App;
