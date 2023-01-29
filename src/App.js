import "./App.css";
import Quiz from "./component/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Result from "./component/Result";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
