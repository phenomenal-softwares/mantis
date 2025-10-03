import React, { createContext, useState } from "react";
import { services } from "../data/services";

export const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [serviceList, setServiceList] = useState(services);

  return (
    <ServicesContext.Provider value={{ serviceList, setServiceList }}>
      {children}
    </ServicesContext.Provider>
  );
};
