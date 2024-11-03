import React, { createContext, useContext, useState } from "react";

const PatientContext = createContext();

export const usePatientContext = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);

  return (
    <PatientContext.Provider value={{ patients, setPatients }}>
      {children}
    </PatientContext.Provider>
  );
};
