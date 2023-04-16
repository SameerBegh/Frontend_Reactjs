import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [detail, setDetail] = useState([]);
  const [tournamentData, setTournamentData] = useState([]);

  return (
    <DataContext.Provider
      value={{ detail, setDetail, tournamentData, setTournamentData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
