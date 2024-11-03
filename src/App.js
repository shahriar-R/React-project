import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Patient from "./pages/Patient";
import MyModal from "./pages/Visit";
import { PatientProvider } from "./contexts/patientContext";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/test";
import ListPatients from "./pages/ListPatients";

function App() {
  return (
    <>
      <Navbar />

      <PatientProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="list" element={<ListPatients />} />
            <Route path="patient" element={<Patient />} />
            <Route path="visit" element={<MyModal />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="test" element={<Test />} />
          </Route>

          {/* <Route path="/step1" element={<Step1 />} /> */}
        </Routes>
      </PatientProvider>
    </>
  );
}

export default App;
