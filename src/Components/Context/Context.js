import React, { createContext, useState } from "react";
export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [detail, setDetail] = useState([]);
  const [tournamentData, setTournamentData] = useState([]);

  // edit
  const [editID, setEditID] = useState("");
  const [editName, setEditName] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [remove, setRemove] = useState(false);
  const [editParticipantName, setEditParticipantName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editMobile, setEditMobile] = useState("");

  return (
    <DataContext.Provider
      value={{
        detail,
        setDetail,
        tournamentData,
        setTournamentData,
        editID,
        setEditID,
        editName,
        setEditName,
        editStartDate,
        setEditStartDate,
        deleteID,
        setDeleteID,
        editEndDate,
        setEditEndDate,
        remove,
        setRemove,
        editParticipantName,
        setEditParticipantName,
        editEmail,
        setEditEmail,
        editMobile,
        setEditMobile,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
