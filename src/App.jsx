import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Step1 from "./pages/create/Step1";
import Step2 from "./pages/create/Step2";
import Step3 from "./pages/create/Step3";
import Step4 from "./pages/create/Step4";
import Retrieve from "./pages/retrieve/Retrieve";

function App() {
  return (
   
      <Routes >
        <Route path="/" element={<Main />} />
        <Route path="/create/step1" element={<Step1 />} />
        <Route path="/create/step2" element={<Step2 />} />
        <Route path="/create/step3" element={<Step3 />} />
        <Route path="/create/step4" element={<Step4 />} />
        <Route path="/retrieve" element={<Retrieve />} />
      </Routes>
   
  );
}

export default App;
